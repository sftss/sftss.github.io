// Ondulation d'eau du curseur : formule pure, rien ici ne dessine.

/** Rayon, opacité et épaisseur du trait d'une ondulation selon son âge (0 → 1). */
export function rippleAt(age: number, maxRadius: number) {
  const t = Math.min(1, Math.max(0, age));
  const eased = 1 - (1 - t) ** 2;
  return { radius: maxRadius * eased, alpha: (1 - t) ** 1.5 * 0.8, width: 0.6 + 1.8 * (1 - t) };
}
