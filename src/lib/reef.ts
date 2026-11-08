/**
 * Récif de coraux au bas de l'accueil, dessiné dans le canvas de Midwater : des branches en
 * courbes avec un halo, sur deux plans, balancées par le courant. Les polypes s'allument au
 * passage du curseur (ou d'un doigt) puis s'éteignent doucement, comme le plancton.
 */

type Pt = [number, number];
interface Branch {
  /** Points de la branche, y vers le haut depuis le pied de la colonie. */
  pts: Pt[];
  w: number;
}
interface Polyp {
  x: number;
  y: number;
  r: number;
}
interface Shape {
  branches: Branch[];
  polyps: Polyp[];
  /** Demi-ellipse pleine sous les polypes (coussins). */
  blob: { rx: number; ry: number } | null;
  /** Hauteur de la forme, polypes compris, à l'échelle 1. */
  height: number;
}
interface Colony {
  /** Position horizontale, en fraction de la largeur : le récif suit le redimensionnement. */
  u: number;
  scale: number;
  phase: number;
  /** Plan arrière : plus petit, plus pâle, sans halo. */
  back: boolean;
  tint: number;
  shape: Shape;
  /** Lueur de chaque polype, de 0 (éteint) à 1 ; même ordre que `shape.polyps`. */
  glow: Float32Array;
}

/** Indices de la palette des coraux (voir MidwaterColors.coral). */
export const CORAL = { yellow: 0, orange: 1, red: 2, lilac: 3, green: 4, blue: 5 } as const;

const GLOW_RADIUS = 90;
const GLOW_FADE = 1.3;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];

/** Décalage horizontal dû au courant : nul au pied, de plus en plus fort en montant. */
const sway = (t: number, phase: number, y: number) => Math.sin(t * 0.9 + phase + y * 0.025) * y * 0.05;

const finish = (branches: Branch[], polyps: Polyp[], blob: Shape['blob']): Shape => ({
  branches,
  polyps,
  blob,
  height: Math.max(
    0,
    ...branches.flatMap((b) => b.pts.map(([, y]) => y)),
    ...polyps.map((p) => p.y + p.r),
    blob?.ry ?? 0,
  ),
});

/** Un arbre de branches qui se divisent à chaque bout, terminées par un polype. */
const tree = (len: number, width: number, depth: number, spread: number, kids: number, tip: number): Shape => {
  const branches: Branch[] = [];
  const polyps: Polyp[] = [];
  const grow = (x: number, y: number, angle: number, length: number, w: number, d: number) => {
    const pts: Pt[] = [[x, y]];
    let a = angle;
    for (let i = 0; i < 5; i++) {
      a += rand(-0.16, 0.16);
      x += (Math.cos(a) * length) / 5;
      y += (Math.sin(a) * length) / 5;
      pts.push([x, y]);
    }
    branches.push({ pts, w: Math.max(1.2, w) });
    if (d > 0) {
      for (let k = 0; k < kids; k++) {
        grow(x, y, a + (k - (kids - 1) / 2) * spread + rand(-0.12, 0.12), length * 0.74, w * 0.68, d - 1);
      }
    } else polyps.push({ x, y, r: tip });
  };
  grow(0, 0, Math.PI / 2, len, width, depth);
  return finish(branches, polyps, null);
};

/** Un dôme couvert de polypes. */
const dome = (rx: number, ry: number, cx: number, size: [number, number]): Polyp[] =>
  Array.from({ length: Math.round(rx * rx * 0.3) }, () => {
    const angle = rand(0, Math.PI);
    const u = Math.sqrt(Math.random());
    return { x: cx + Math.cos(angle) * u * rx, y: Math.sin(angle) * u * ry, r: rand(...size) };
  });

const cushion = (): Shape => {
  const rx = rand(18, 32);
  const ry = rx * rand(0.6, 0.85);
  return finish([], dome(rx, ry, 0, [2.2, 3.6]), { rx, ry });
};

const bush = (): Shape => {
  const polyps: Polyp[] = [];
  const lumps = pick([2, 3]);
  for (let k = 0; k < lumps; k++) {
    const rx = rand(14, 22);
    polyps.push(...dome(rx, rx * rand(0.7, 1), (k - (lumps - 1) / 2) * 20, [3, 5]));
  }
  return finish([], polyps, null);
};

/** Des doigts épais, comme une éponge rouge. */
const fingers = (): Shape => {
  const branches: Branch[] = [];
  const polyps: Polyp[] = [];
  const count = pick([3, 4]);
  for (let k = 0; k < count; k++) {
    const x = (k - (count - 1) / 2) * 13;
    const lean = rand(-0.12, 0.12);
    const length = rand(22, 45);
    const top: Pt = [x + lean * length, length];
    branches.push({ pts: [[x, 0], [x + lean * length * 0.5, length * 0.5], top], w: 11 });
    polyps.push({ x: top[0], y: top[1], r: 5 });
  }
  return finish(branches, polyps, null);
};

/** Des tubes de longueurs inégales. */
const tubes = (): Shape => {
  const branches: Branch[] = [];
  const polyps: Polyp[] = [];
  const count = pick([3, 4, 5]);
  for (let k = 0; k < count; k++) {
    const x = (k - (count - 1) / 2) * 10;
    const length = rand(18, 40);
    branches.push({ pts: [[x, 0], [x, length]], w: 7 });
    polyps.push({ x, y: length, r: 4.5 });
  }
  return finish(branches, polyps, null);
};

/** Les espèces du récif : chacune a ses teintes et sa fréquence. */
const SPECIES: { tints: number[]; make: () => Shape; weight: number }[] = [
  { tints: [CORAL.yellow, CORAL.yellow, CORAL.orange], make: cushion, weight: 4 },
  { tints: [CORAL.green], make: bush, weight: 3 },
  { tints: [CORAL.lilac, CORAL.blue], make: () => tree(rand(24, 30), 2.2, 5, 0.55, 2, 1.6), weight: 3 },
  { tints: [CORAL.red], make: fingers, weight: 2 },
  { tints: [CORAL.orange, CORAL.lilac, CORAL.red], make: () => tree(rand(26, 34), 7, 3, 0.7, 2, 3.5), weight: 2 },
  { tints: [CORAL.yellow, CORAL.blue], make: tubes, weight: 1 },
];
const TOTAL_WEIGHT = SPECIES.reduce((sum, species) => sum + species.weight, 0);

export class Reef {
  private colonies: Colony[] = [];
  private width = 0;
  /** Hauteur du plus grand corail : le récif n'est dessiné que s'il peut être à l'écran. */
  private height = 0;
  /** Des polypes sont allumés : à éteindre d'un coup quand le récif quitte l'écran. */
  private lit = false;

  /** Une colonie tous les ~45 px : le récif n'est retiré au sort que si leur nombre change. */
  resize(width: number) {
    this.width = width;
    const count = Math.max(8, Math.round(width / 45));
    if (this.colonies.length === count) return;
    this.colonies = Array.from({ length: count }, (_, i) => {
      let roll = Math.random() * TOTAL_WEIGHT;
      const species = SPECIES.find((sp) => (roll -= sp.weight) < 0) ?? SPECIES[0];
      const shape = species.make();
      // Deux colonies sur trois à l'arrière : plus petites et plus pâles, elles donnent de la profondeur.
      const back = i % 3 !== 0;
      return {
        u: (i + 0.1 + Math.random() * 0.8) / count,
        scale: back ? rand(0.8, 1.05) : rand(1.05, 1.4),
        phase: Math.random() * Math.PI * 2,
        back,
        tint: pick(species.tints),
        shape,
        glow: new Float32Array(shape.polyps.length),
      };
    });
    // L'arrière d'abord, l'avant par-dessus.
    this.colonies.sort((a, b) => Number(b.back) - Number(a.back));
    this.height = Math.max(...this.colonies.map((c) => c.shape.height * c.scale)) + 20;
  }

  /**
   * Dessine le récif, son pied à `base` (px écran). `pointer` est en px écran, `dt` en secondes.
   * `palette` suit l'ordre de CORAL.
   */
  draw(
    ctx: CanvasRenderingContext2D,
    opts: {
      base: number;
      viewHeight: number;
      time: number;
      dt: number;
      pointer: { x: number; y: number } | null;
      palette: string[];
    },
  ) {
    const { base, viewHeight, time: t, dt, pointer, palette } = opts;
    // Le récif n'existe qu'au bas de la page : rien à dessiner tant qu'il est hors de l'écran.
    if (base < -20 || base - this.height > viewHeight) {
      if (this.lit) {
        for (const c of this.colonies) c.glow.fill(0);
        this.lit = false;
      }
      return;
    }

    const fade = Math.exp(-dt / GLOW_FADE);
    let lit = false;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const c of this.colonies) {
      const color = palette[c.tint % palette.length];
      const s = c.scale;
      const x0 = c.u * this.width;
      const alpha = c.back ? 0.32 : 0.85;
      const X = (x: number, y: number) => x0 + x * s + sway(t, c.phase, y * s);
      const Y = (y: number) => base - 2 - y * s;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      const { blob, branches, polyps } = c.shape;
      if (blob) {
        ctx.globalAlpha = alpha * 0.3;
        ctx.beginPath();
        ctx.ellipse(x0, base - 2, blob.rx * s, blob.ry * s, 0, Math.PI, Math.PI * 2);
        ctx.fill();
      }
      for (const b of branches) {
        // Un halo large et pâle, puis le trait net : pas de shadowBlur, trop coûteux ici.
        for (const halo of c.back ? [false] : [true, false]) {
          ctx.globalAlpha = halo ? alpha * 0.16 : alpha;
          ctx.lineWidth = (b.w + (halo ? 6 : 0)) * s;
          ctx.beginPath();
          ctx.moveTo(X(b.pts[0][0], b.pts[0][1]), Y(b.pts[0][1]));
          for (let i = 1; i < b.pts.length - 1; i++) {
            const [x, y] = b.pts[i];
            const [nx, ny] = b.pts[i + 1];
            ctx.quadraticCurveTo(X(x, y), Y(y), X((x + nx) / 2, (y + ny) / 2), Y((y + ny) / 2));
          }
          const last = b.pts[b.pts.length - 1];
          ctx.lineTo(X(last[0], last[1]), Y(last[1]));
          ctx.stroke();
        }
      }
      for (let i = 0; i < polyps.length; i++) {
        const p = polyps[i];
        const x = X(p.x, p.y);
        const y = Y(p.y);
        // Le curseur allume les polypes proches ; la lueur s'éteint ensuite doucement.
        let g = c.glow[i] * fade;
        if (pointer) {
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          if (d < GLOW_RADIUS) g = Math.max(g, (1 - d / GLOW_RADIUS) ** 2);
        }
        c.glow[i] = g < 0.01 ? 0 : g;
        if (g >= 0.01) lit = true;

        const r = p.r * s;
        if (!c.back || g > 0.02) {
          ctx.globalAlpha = (c.back ? 0 : alpha * 0.14) + g * 0.42;
          ctx.beginPath();
          ctx.arc(x, y, r * (2.4 + g * 2.2), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = Math.min(1, alpha + g * 0.5);
        ctx.beginPath();
        ctx.arc(x, y, r * (1 + g * 0.6), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = Math.min(1, alpha * 0.55 + g * 0.5);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x, y, r * 0.36, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = color;
      }
    }
    this.lit = lit;
    ctx.globalAlpha = 1;
  }
}
