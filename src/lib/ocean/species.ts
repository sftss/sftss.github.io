// Copied from ascii-sharks (https://github.com/stackedlol/ascii-sharks, commit a0074c1),
// © 2026 drewdi, MIT licence: see LICENSE in this folder. Changes are marked "Adaptation:".
export interface Species {
  name: string;
  cruise: number;
  maxSpeed: number;
  minSpeed: number;
  /** Relative odds of a new school being this species. */
  weight: number;
  schoolSize: [number, number];
  /** Personal space in grid cells (x, y), so every fish gets its own glyph. */
  spacing: [number, number];
  // Behaviour weights. Different mixes produce different collective shapes
  // (Couzin et al. 2002): strong alignment gives polarised schools and
  // ribbons, low alignment gives swarms, and a tangential pull gives a mill.
  align: number;
  cohesion: number;
  jitter: number;
  /** Tangential pull around the local centre: >0 makes a rotating bait ball. */
  mill: number;
  /** Damps vertical speed; real fish mostly cruise level. */
  verticalDrag: number;
  /** Adaptation: glyphs facing right and left; a single dash when absent. */
  glyphs?: [string, string];
  /** Adaptation: CSS custom property holding the colour; the default pale white when absent. */
  color?: string;
}

export const SPECIES: Species[] = [
  {
    name: "sardine",
    cruise: 36, maxSpeed: 64, minSpeed: 18, weight: 3,
    schoolSize: [18, 28], spacing: [1.8, 1.1],
    align: 1.6, cohesion: 1.6, jitter: 40, mill: 70, verticalDrag: 0.5,
  },
  {
    name: "anchovy",
    cruise: 46, maxSpeed: 78, minSpeed: 22, weight: 3,
    schoolSize: [20, 32], spacing: [1.5, 1],
    align: 3.2, cohesion: 0.45, jitter: 30, mill: 0, verticalDrag: 1.4,
  },
  {
    name: "silverside",
    cruise: 40, maxSpeed: 70, minSpeed: 20, weight: 3,
    schoolSize: [12, 20], spacing: [2, 1.1],
    align: 2.4, cohesion: 1.1, jitter: 35, mill: 0, verticalDrag: 1.6,
  },
  {
    name: "mackerel",
    cruise: 32, maxSpeed: 60, minSpeed: 16, weight: 2,
    schoolSize: [5, 9], spacing: [2.6, 1.3],
    align: 2, cohesion: 0.9, jitter: 25, mill: 0, verticalDrag: 2,
  },
  {
    name: "goby",
    cruise: 26, maxSpeed: 56, minSpeed: 10, weight: 1,
    schoolSize: [8, 12], spacing: [1.4, 1.1],
    align: 0.35, cohesion: 1.4, jitter: 110, mill: 0, verticalDrag: 0.3,
  },
];

/**
 * Adaptation: reef fish for the surface of the home page. Small loose groups rather than
 * bait balls, slower, and drawn as coloured `><>` instead of dashes.
 */
export const TROPICAL: Species[] = [
  {
    name: "tang",
    cruise: 22, maxSpeed: 48, minSpeed: 10, weight: 2,
    schoolSize: [4, 7], spacing: [4.2, 1.8],
    align: 1.4, cohesion: 1, jitter: 30, mill: 0, verticalDrag: 1.2,
    glyphs: ["><>", "<><"], color: "--fish-blue",
  },
  {
    name: "butterflyfish",
    cruise: 18, maxSpeed: 42, minSpeed: 8, weight: 2,
    schoolSize: [3, 5], spacing: [4.2, 1.8],
    align: 0.9, cohesion: 1.2, jitter: 45, mill: 0, verticalDrag: 0.9,
    glyphs: ["><>", "<><"], color: "--fish-yellow",
  },
  {
    name: "anthias",
    cruise: 24, maxSpeed: 52, minSpeed: 10, weight: 2,
    schoolSize: [5, 8], spacing: [4, 1.7],
    align: 1.2, cohesion: 1.3, jitter: 40, mill: 0, verticalDrag: 0.8,
    glyphs: ["><>", "<><"], color: "--fish-red",
  },
  {
    name: "clownfish",
    cruise: 16, maxSpeed: 40, minSpeed: 6, weight: 1,
    schoolSize: [2, 3], spacing: [4.4, 1.9],
    align: 0.6, cohesion: 1.6, jitter: 60, mill: 0, verticalDrag: 0.6,
    glyphs: ["><>", "<><"], color: "--fish-orange",
  },
];

// Adaptation: the pool is a parameter, so a world can hold reef fish instead of bait fish.
export function pickSpecies(pool: Species[] = SPECIES) {
  const total = pool.reduce((sum, s) => sum + s.weight, 0);
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= pool[i].weight;
    if (r <= 0) return i;
  }
  return 0;
}
