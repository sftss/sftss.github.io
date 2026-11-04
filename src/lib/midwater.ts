/**
 * Eau du milieu et du fond de l'accueil, dans un seul canvas fixe :
 *  - neige marine : des particules qui descendent, en parallaxe avec le défilement ;
 *  - méduses ASCII : elles dérivent dans les marges des sections du milieu ;
 *  - plancton bioluminescent : il apparaît progressivement à partir d'une section
 *    et s'allume au passage du curseur (ou d'un doigt), en laissant une traînée.
 * Les méduses et le plancton vivent en coordonnées de page : on passe devant en défilant.
 * En mouvement réduit, une image fixe redessinée au défilement.
 */

export interface MidwaterAnchors {
  /** La neige apparaît en arrivant sur cet élément. */
  snow: HTMLElement;
  /** Les méduses vivent entre le haut de `jellyFrom` et le haut de `jellyTo`. */
  jellyFrom: HTMLElement;
  jellyTo: HTMLElement;
  /** Le plancton commence ici et va jusqu'en bas de la page. */
  plankton: HTMLElement;
}

export interface MidwaterColors {
  snow: string;
  jelly: string;
  glow: string;
}

interface Flake {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
  alpha: number;
}

interface Mote {
  x: number;
  /** Position dans la zone du plancton, de 0 (haut) à 1 (bas de page). */
  u: number;
  phase: number;
  speed: number;
  size: number;
  base: number;
  glow: number;
}

interface Jelly {
  /** Fraction de la largeur visée ; x est la position réelle, poussée par le curseur. */
  home: number;
  x: number;
  /** Position dans la bande des méduses, de 0 à 1. */
  u: number;
  scale: number;
  phase: number;
  /** Écart horizontal causé par le curseur, qui se résorbe. */
  push: number;
  /** Atténuation quand la méduse passe derrière le texte (écran étroit). */
  dim: number;
}

const GLOW_RADIUS = 110;
const GLOW_FADE = 2.2;
const SNOW_PARALLAX = 0.35;
/** Cloche de la méduse : une ligne par rangée, centrée. */
const BELL = ['.-~~~-.', "/ '   ' \\", '( .   . )', "'~^~^~^~'"];
/** Colonnes des tentacules, relatives au centre, et leur longueur en rangées. */
const TENTACLES: [number, number][] = [
  [-3, 5],
  [-1, 7],
  [1, 6],
  [3, 5],
];

const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

export class Midwater {
  private ctx: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private flakes: Flake[] = [];
  private motes: Mote[] = [];
  private jellies: Jelly[] = [];
  private snowTop = 0;
  private jellyTop = 0;
  private jellyBottom = 0;
  private planktonTop = 0;
  private pageBottom = 0;
  private containerWidth = 0;
  private colors: MidwaterColors = { snow: '#9aa', jelly: '#c9b', glow: '#7ee' };
  private font = 'ui-monospace, monospace';
  /** Position du pointeur à l'écran : la page défile dessous, on convertit à chaque image. */
  private pointer: { x: number; y: number } | null = null;
  private raf = 0;
  private last = 0;
  private time = 0;
  private disposed = false;
  private reduced = matchMedia('(prefers-reduced-motion: reduce)');
  private pageObserver: ResizeObserver;

  constructor(
    private canvas: HTMLCanvasElement,
    private anchors: MidwaterAnchors,
  ) {
    this.ctx = canvas.getContext('2d')!;
    this.font = getComputedStyle(canvas).fontFamily || this.font;
    // La hauteur de la page change (images, filtres de projets) : on recale les zones.
    this.pageObserver = new ResizeObserver(() => this.layout());
    this.pageObserver.observe(document.body);
    addEventListener('resize', this.onResize, { passive: true });
    addEventListener('scroll', this.onScroll, { passive: true });
    addEventListener('pointermove', this.onPointer, { passive: true });
    addEventListener('pointerdown', this.onPointer, { passive: true });
    addEventListener('pointerup', this.onRelease, { passive: true });
    addEventListener('pointercancel', this.onRelease, { passive: true });
    document.documentElement.addEventListener('pointerleave', this.onLeave);
    this.reduced.addEventListener('change', this.onMotion);
    this.onResize();
    this.schedule();
  }

  setColors(colors: MidwaterColors) {
    this.colors = colors;
    if (this.reduced.matches) this.draw();
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.pageObserver.disconnect();
    removeEventListener('resize', this.onResize);
    removeEventListener('scroll', this.onScroll);
    removeEventListener('pointermove', this.onPointer);
    removeEventListener('pointerdown', this.onPointer);
    removeEventListener('pointerup', this.onRelease);
    removeEventListener('pointercancel', this.onRelease);
    document.documentElement.removeEventListener('pointerleave', this.onLeave);
    this.reduced.removeEventListener('change', this.onMotion);
  }

  // ── mise en place ─────────────────────────────────────────────────

  private onResize = () => {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    if (width < 1 || height < 1) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const sx = this.width ? width / this.width : 1;
    const sy = this.height ? height / this.height : 1;
    this.width = width;
    this.height = height;
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Neige : densité constante, positions gardées à l'échelle.
    for (const f of this.flakes) {
      f.x *= sx;
      f.y *= sy;
    }
    const flakes = Math.round(Math.min(320, Math.max(90, (width * height) / 5000)));
    while (this.flakes.length < flakes) this.flakes.push(this.flake(Math.random() * height));
    this.flakes.length = flakes;
    this.layout();
  };

  /** Recalcule les zones en coordonnées de page et ajuste la population du plancton. */
  private layout() {
    const top = (el: HTMLElement) => el.getBoundingClientRect().top + scrollY;
    const { snow, jellyFrom, jellyTo, plankton } = this.anchors;
    this.snowTop = top(snow);
    this.jellyTop = top(jellyFrom);
    this.jellyBottom = Math.max(this.jellyTop + 1, top(jellyTo));
    this.planktonTop = top(plankton);
    this.pageBottom = Math.max(this.planktonTop + 1, document.documentElement.scrollHeight);
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    this.containerWidth = Math.min(this.width - 3 * rem, 68 * rem);

    const area = this.width * (this.pageBottom - this.planktonTop);
    const motes = Math.round(Math.min(1400, Math.max(80, area / 2600)));
    while (this.motes.length < motes) this.motes.push(this.mote(Math.random()));
    this.motes.length = motes;

    if (!this.jellies.length) this.seedJellies();
    this.placeJellies();
    if (this.reduced.matches) this.draw();
  }

  private flake(y: number): Flake {
    return {
      x: Math.random() * this.width,
      y,
      // Un flocon sur six est un agrégat : plus gros, plus lent, plus pâle.
      ...(Math.random() < 1 / 6
        ? { size: 2.6 + Math.random() * 1.6, speed: 3 + Math.random() * 5, alpha: 0.2 + Math.random() * 0.2 }
        : { size: 1.2 + Math.random() * 1.4, speed: 5 + Math.random() * 10, alpha: 0.35 + Math.random() * 0.4 }),
      phase: Math.random() * Math.PI * 2,
    };
  }

  private mote(u: number): Mote {
    return {
      x: Math.random() * this.width,
      u,
      phase: Math.random() * Math.PI * 2,
      speed: 4 + Math.random() * 8,
      size: 0.8 + Math.random() * 1.6,
      base: 0.06 + Math.random() * 0.14,
      glow: 0,
    };
  }

  /** Quatre méduses réparties dans la bande, en alternant marge gauche et marge droite. */
  private seedJellies() {
    const count = 4;
    for (let i = 0; i < count; i++) {
      this.jellies.push({
        home: i % 2 === 0 ? 0 : 1,
        x: 0,
        u: (i + 0.3 + Math.random() * 0.4) / count,
        scale: 0.85 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        push: 0,
        dim: 1,
      });
    }
  }

  /** Dans les marges si elles sont assez larges ; sinon n'importe où, atténuées, derrière le texte. */
  private placeJellies() {
    const margin = (this.width - this.containerWidth) / 2;
    const roomy = margin >= 150;
    for (const [i, j] of this.jellies.entries()) {
      if (roomy) {
        const centre = margin / 2;
        j.x = j.home === 0 ? centre : this.width - centre;
        j.dim = 1;
      } else {
        j.x = this.width * (0.15 + 0.7 * ((i * 0.37 + j.home * 0.5) % 1));
        j.dim = 0.4;
      }
    }
  }

  // ── boucle ────────────────────────────────────────────────────────

  private schedule() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    if (this.disposed) return;
    if (this.reduced.matches) {
      this.draw();
      return;
    }
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    this.time += dt;
    this.step(dt);
    this.draw();
    this.raf = requestAnimationFrame(this.frame);
  };

  private step(dt: number) {
    const { height: H, time: t } = this;
    for (const f of this.flakes) {
      f.y += f.speed * dt;
      f.x += Math.sin(t * 0.5 + f.phase) * 4 * dt;
      if (f.y > H + 4) Object.assign(f, this.flake(-4));
    }

    const span = this.pageBottom - this.planktonTop;
    const fade = Math.exp(-dt / GLOW_FADE);
    const p = this.pointer && { x: this.pointer.x, y: this.pointer.y + scrollY };
    for (const m of this.motes) {
      // Remontée lente et balancement, comme de la neige marine à l'envers.
      m.u -= (m.speed * dt) / span;
      m.x += Math.sin(t * 0.6 + m.phase) * 6 * dt;
      if (m.u < 0) Object.assign(m, this.mote(1));
      m.glow *= fade;
      if (p) {
        const d = Math.hypot(m.x - p.x, this.planktonTop + m.u * span - p.y);
        if (d < GLOW_RADIUS) m.glow = Math.max(m.glow, (1 - d / GLOW_RADIUS) ** 1.5);
      }
      // Rarement, un point s'allume tout seul : l'essentiel de la lumière vient du curseur.
      if (Math.random() < dt * 0.0025) m.glow = Math.max(m.glow, 0.6);
    }

    const band = this.jellyBottom - this.jellyTop;
    for (const j of this.jellies) {
      j.phase += dt * 1.7;
      // Poussée pendant la contraction de la cloche, puis lente redescente.
      const thrust = Math.max(0, Math.sin(j.phase));
      j.u -= ((4 + 26 * thrust * thrust) * dt) / band;
      if (j.u < -0.05) j.u = 1.05;
      if (p) {
        const jy = this.jellyTop + j.u * band;
        const dx = j.x + j.push - p.x;
        const d = Math.hypot(dx, jy - p.y);
        if (d < 140 && d > 1) j.push += (dx / d) * (1 - d / 140) * 90 * dt;
      }
      j.push *= Math.exp(-dt * 0.4);
    }
  }

  private draw() {
    const { ctx, width: W, height: H } = this;
    ctx.clearRect(0, 0, W, H);
    const centre = scrollY + H / 2;

    // Neige : absente en surface, puis plus discrète quand le plancton prend le relais.
    const snowAlpha =
      smooth((centre - this.snowTop + H * 0.3) / (H * 0.6)) * (1 - 0.4 * smooth((centre - this.planktonTop) / H));
    if (snowAlpha > 0.01) {
      ctx.fillStyle = this.colors.snow;
      const shift = scrollY * SNOW_PARALLAX;
      for (const f of this.flakes) {
        const y = (((f.y - shift) % H) + H) % H;
        ctx.globalAlpha = f.alpha * snowAlpha;
        ctx.beginPath();
        ctx.arc(f.x, y, f.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    this.drawJellies();
    this.drawPlankton();
    ctx.globalAlpha = 1;
  }

  private drawPlankton() {
    const { ctx, height: H } = this;
    const span = this.pageBottom - this.planktonTop;
    if (scrollY + H < this.planktonTop) return;
    ctx.fillStyle = this.colors.glow;
    for (const m of this.motes) {
      const pageY = this.planktonTop + m.u * span;
      const y = pageY - scrollY;
      if (y < -20 || y > H + 20) continue;
      // Apparition progressive sur les 700 premiers pixels de la zone.
      const ramp = 0.25 + 0.75 * smooth((pageY - this.planktonTop) / 700);
      if (m.glow > 0.05) {
        ctx.globalAlpha = m.glow * 0.32;
        ctx.beginPath();
        ctx.arc(m.x, y, m.size * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = Math.max(m.base * ramp, m.glow);
      ctx.beginPath();
      ctx.arc(m.x, y, m.size * (1 + m.glow), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawJellies() {
    const { ctx, height: H, time: t } = this;
    const band = this.jellyBottom - this.jellyTop;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const j of this.jellies) {
      const size = 13 * j.scale;
      const cw = size * 0.6;
      const ch = size * 1.05;
      const x0 = j.x + j.push + Math.sin(t * 0.3 + j.phase * 0.2) * 10;
      const y0 = this.jellyTop + j.u * band - scrollY;
      if (y0 < -ch * 14 || y0 > H + ch * 2) continue;
      // Les bords de la bande : la méduse apparaît et disparaît en fondu.
      const edge = smooth(Math.min(j.u + 0.05, 1.05 - j.u) / 0.15);
      const alpha = 0.75 * j.dim * edge;
      if (alpha < 0.01) continue;
      const squeeze = 1 - 0.12 * Math.max(0, Math.sin(j.phase));
      ctx.font = `${Math.round(size)}px ${this.font}`;
      ctx.fillStyle = this.colors.jelly;

      // Halo très léger derrière la cloche.
      ctx.globalAlpha = alpha * 0.06;
      ctx.beginPath();
      ctx.ellipse(x0, y0 + ch * 1.5, cw * 6 * squeeze, ch * 2.6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = alpha;
      BELL.forEach((line, row) => {
        const chars = [...line];
        chars.forEach((c, k) => {
          if (c === ' ') return;
          const dx = (k - (chars.length - 1) / 2) * cw * squeeze;
          ctx.fillText(c, x0 + dx, y0 + row * ch);
        });
      });

      // Tentacules : chaque rangée ondule avec un retard, le glyphe suit la pente.
      TENTACLES.forEach(([col, length], i) => {
        for (let k = 1; k <= length; k++) {
          const wave = t * 1.6 - k * 0.7 + i * 1.3;
          const amp = cw * 0.55 * (0.3 + k / length);
          const dx = Math.sin(wave) * amp;
          const slope = Math.cos(wave);
          const c = slope > 0.4 ? ')' : slope < -0.4 ? '(' : k % 2 ? '|' : ':';
          ctx.globalAlpha = alpha * (1 - (k / length) * 0.75);
          ctx.fillText(c, x0 + col * cw * squeeze + dx, y0 + (BELL.length - 1 + k) * ch);
        }
      });
    }
  }

  // ── entrées ───────────────────────────────────────────────────────

  private onScroll = () => {
    if (this.reduced.matches) this.draw();
  };

  private onPointer = (e: PointerEvent) => {
    this.pointer = { x: e.clientX, y: e.clientY };
  };

  /** Un doigt levé ne laisse pas de lumière derrière lui ; la souris, si. */
  private onRelease = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') this.pointer = null;
  };

  private onLeave = () => {
    this.pointer = null;
  };

  private onMotion = () => this.schedule();
}
