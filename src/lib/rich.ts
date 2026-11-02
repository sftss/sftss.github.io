export interface RichPart {
  text: string;
  keyword: boolean;
}

/** Découpe « texte [[mot-clé]] texte » en morceaux ; les crochets disparaissent. */
export function parseRich(source: string): RichPart[] {
  return source
    .split(/\[\[(.+?)\]\]/)
    .map((text, index) => ({ text, keyword: index % 2 === 1 }))
    .filter((part) => part.text !== '');
}

/**
 * Sépare les mots et les espaces ordinaires, pour entourer chaque mot sans perdre les espaces.
 * L'espace insécable reste dans le mot : « Lyon 2 » ne se coupe pas.
 */
export const words = (text: string) => text.split(/( +)/).filter(Boolean);
