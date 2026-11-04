/**
 * Plancton bioluminescent : des points qui dérivent lentement dans le noir et s'allument
 * au passage du curseur (ou d'un doigt), puis s'éteignent doucement, ce qui laisse une traînée.
 * La boucle ne tourne que si le canvas est à l'écran ; en mouvement réduit, une image fixe.
 */
interface Mote {
  x: number;
  y: number;
  /** Phase de la dérive sinusoïdale. */
  phase: number;
  speed: number;
  size: number;
  /** Lueur de repos, très faible. */
  base: number;
  /** Lueur actuelle, de 0 à 1. */
  glow: number;
}

const RADIUS = 110;
/** Durée de vie de la lueur (constante de temps, en secondes). */
const FADE = 2.2;

export class Plankton {
  private ctx: CanvasRenderingContext2D;
  private motes: Mote[] = [];
  private width = 0;
  private height = 0;
  private color = '#7fe0e0';
  /** Position du pointeur à l'écran : convertie à chaque image, car la page défile dessous. */
  private pointer: { x: number; y: number } | null = null;
  private raf = 0;
  private last = 0;
  private visible = false;
  private disposed = false;
  private reduced = matchMedia('(prefers-reduced-motion: reduce)');
  private resizer: ResizeObserver;
  private observer: IntersectionObserver;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.resizer = new ResizeObserver(() => this.resize());
    this.resizer.observe(canvas);
    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.schedule();
    });
    this.observer.observe(canvas);
    addEventListener('pointermove', this.onPointer, { passive: true });
    addEventListener('pointerdown', this.onPointer, { passive: true });
    addEventListener('pointerup', this.onRelease, { passive: true });
    addEventListener('pointercancel', this.onRelease, { passive: true });
    document.documentElement.addEventListener('pointerleave', this.onLeave);
    this.reduced.addEventListener('change', this.onMotion);
    this.resize();
  }

  setColor(color: string) {
    this.color = color;
    if (this.reduced.matches) this.draw();
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizer.disconnect();
    this.observer.disconnect();
    removeEventListener('pointermove', this.onPointer);
    removeEventListener('pointerdown', this.onPointer);
    removeEventListener('pointerup', this.onRelease);
    removeEventListener('pointercancel', this.onRelease);
    document.documentElement.removeEventListener('pointerleave', this.onLeave);
    this.reduced.removeEventListener('change', this.onMotion);
  }

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Densité constante : un point pour environ 2 600 px², dans des bornes raisonnables.
    const count = Math.round(Math.min(260, Math.max(60, (rect.width * rect.height) / 2600)));
    while (this.motes.length < count) this.motes.push(this.spawn(Math.random() * rect.height));
    this.motes.length = count;
    for (const m of this.motes) {
      m.x = Math.min(m.x, rect.width);
      m.y = Math.min(m.y, rect.height);
    }
    this.draw();
  }

  private spawn(y: number): Mote {
    return {
      x: Math.random() * this.width,
      y,
      phase: Math.random() * Math.PI * 2,
      speed: 4 + Math.random() * 8,
      size: 0.8 + Math.random() * 1.6,
      base: 0.06 + Math.random() * 0.14,
      glow: 0,
    };
  }

  private schedule() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    if (this.disposed || !this.visible || this.reduced.matches) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    this.step(dt, now / 1000);
    this.draw();
    this.raf = requestAnimationFrame(this.frame);
  };

  private step(dt: number, t: number) {
    const fade = Math.exp(-dt / FADE);
    const rect = this.canvas.getBoundingClientRect();
    const p = this.pointer && { x: this.pointer.x - rect.left, y: this.pointer.y - rect.top };
    for (const m of this.motes) {
      // Remontée lente et balancement latéral, comme de la neige marine à l'envers.
      m.y -= m.speed * dt;
      m.x += Math.sin(t * 0.6 + m.phase) * 6 * dt;
      if (m.y < -4) Object.assign(m, this.spawn(this.height + 4));
      m.glow *= fade;
      if (p) {
        const d = Math.hypot(m.x - p.x, m.y - p.y);
        if (d < RADIUS) m.glow = Math.max(m.glow, (1 - d / RADIUS) ** 1.5);
      }
      // De temps en temps, un point s'allume tout seul.
      if (Math.random() < dt * 0.02) m.glow = Math.max(m.glow, 0.6);
    }
  }

  private draw() {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = this.color;
    for (const m of this.motes) {
      const light = Math.max(m.base, m.glow);
      // Halo large et pâle, puis cœur net : une lueur sans shadowBlur, trop coûteux.
      if (m.glow > 0.05) {
        ctx.globalAlpha = m.glow * 0.32;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = light;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.size * (1 + m.glow), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

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

  private onMotion = () => {
    if (this.reduced.matches) this.draw();
    this.schedule();
  };
}
