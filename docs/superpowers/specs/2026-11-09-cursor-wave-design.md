# Effet de vague sur le curseur — conception

## Décision

Trois variantes ont été essayées côte à côte (ondulations d'eau, traînée ondulante, déformation du fond de l'océan). Les ondulations d'eau (`ripple`) sont conservées ; les deux autres, l'ancienne traînée de bulles, le sélecteur temporaire et le paramètre `?wave=` ont été supprimés.

## Comportement

Dans [Cursor.astro](../../../src/components/Cursor.astro), la traînée de bulles ASCII est remplacée par des ondulations d'eau sur le même canvas et la même boucle d'animation :

- un cercle naît tous les 3 pas d'échantillonnage (45 px de trajet réel) ; il s'élargit jusqu'à 36 px en environ 1 s en s'effaçant ;
- un clic crée une ondulation plus large (72 px, 1,1 s) ;
- chaque ondulation est un anneau principal et un second plus petit (60 %) et plus pâle (50 %) ;
- couleur d'accent relue à chaque image, donc elle suit le thème ;
- au plus 24 ondulations actives ; la boucle s'arrête quand il n'y a plus rien à animer.

La formule (rayon, opacité, épaisseur selon l'âge) est dans [wave.ts](../../../src/lib/wave.ts) et testée dans `wave.test.ts`.

## Garde-fous

- `prefers-reduced-motion` : aucune ondulation.
- Champs de saisie, iframes, `pointerleave` : comportement existant conservé (la trace repart de zéro au retour).
- Aucune dépendance ajoutée.

## Vérification

Tests (`npm test`) et build verts. Le rendu n'a pas été vérifié dans un navigateur par Claude (extension Chrome non connectée) ; il reste à valider à l'œil.
