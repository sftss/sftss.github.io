/**
 * Profondimètre du header : la progression de lecture devient une profondeur de plongée.
 * La courbe est quadratique pour que la surface dure un peu (le hero) et que l'on
 * atteigne les abysses en bas de page (Contact).
 */
export const MAX_DEPTH = 4200;

/** Zones pélagiques, de la surface vers le fond (bornes supérieures en mètres). */
export const ZONES = ['epipelagic', 'mesopelagic', 'bathypelagic', 'abyssopelagic'] as const;
export type Zone = (typeof ZONES)[number];
const ZONE_TOPS = [0, 200, 1000, 4000];

/** Profondeur en mètres, arrondie à 10 m pour que le chiffre ne tremble pas. */
export function depthAt(progress: number) {
  const p = Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0));
  return Math.round((MAX_DEPTH * p * p) / 10) * 10;
}

export function zoneAt(depth: number): Zone {
  let zone = 0;
  for (let i = 0; i < ZONE_TOPS.length; i++) if (depth >= ZONE_TOPS[i]) zone = i;
  return ZONES[zone];
}

/** « −1 240 m » : vrai signe moins, séparateur de milliers de la langue, espace insécable. */
export function formatDepth(depth: number, lang: string) {
  const value = new Intl.NumberFormat(lang, { maximumFractionDigits: 0 }).format(depth);
  return `${depth > 0 ? '−' : ''}${value} m`;
}
