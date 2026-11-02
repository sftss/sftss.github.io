# Finitions du site : design

Date : 2026-11-02. Branche : `site-polish`, créée depuis `main` après la fusion de la PR #13.

Inspirations : [mysticsaba.com](https://mysticsaba.com/) (header, curseur, sélection, « About ») et [stackedlol/ascii-sharks](https://github.com/stackedlol/ascii-sharks) (requins ASCII, licence MIT).

## Objectifs

1. Corriger les chiffres vidéo, les metas de partage et la page 404, qui affiche aujourd'hui les deux langues l'une sous l'autre.
2. Habiller le site : header toujours visible, curseur, sélection et barre de défilement personnalisés.
3. Changer de langue sans recharger la page.
4. Ajouter des requins ASCII : un océan sur la 404 et un requin qui traverse de temps en temps l'accueil.
5. Mettre en forme « À propos » façon mysticsaba.

Hors périmètre : la réécriture du texte d'« À propos », la traduction du chatbot Botpress et un océan permanent en fond d'accueil.

## Lot 1 : corrections rapides

### Chiffres vidéo

Dans `src/i18n/home.ts`, la statistique de la carte « Vidéos verticales » devient :

- FR : `Meilleure publication : environ 350k vues et 20k likes`
- EN : `Best post: about 350k views and 20k likes`

Les chiffres eux-mêmes ne changent pas : ils restent ceux déclarés par Sefer.

### Metas de partage

La ligne répétée de l'aperçu vient de `src/pages/index.astro`. Sa description met les deux langues bout à bout et la page n'a aucune balise `og:`.

- La racine `/` garde le titre `Sefer Tasdemir | Data Scientist`. Elle reçoit une seule description en français, la langue par défaut du site, et les balises `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (`/assets/img/og-fr.png`, 1200 × 630), `og:locale` et `twitter:card`.
- Les descriptions `meta.description` de `/fr/` et `/en/` (`src/i18n/ui.ts`) ne répètent plus le titre « Portfolio de Sefer Tasdemir, Data Scientist ». Elles commencent par le contenu :
  - FR : `Pipelines de données, BI et machine learning. En Master Informatique à Lyon 2, je cherche un stage à partir d’avril 2027.`
  - EN : `Data pipelines, BI and machine learning. Master’s student in Computer Science at Lyon 2, looking for an internship from April 2027.`
- La racine reprend la description FR.

### Page 404

GitHub Pages sert le même `404.html` pour toute adresse inconnue. La langue se choisit donc dans le navigateur.

- Nouvelle mise en page plein écran, sans le header ni le footer du site : l'océan ASCII (lot 4) occupe tout l'écran et le contenu est centré par-dessus, sur un léger voile.
- Le HTML contient les deux versions du texte. Un script en ligne, exécuté avant l'affichage, en garde une. L'ordre de priorité :
  1. l'adresse demandée, si elle commence par `/en/` ou `/fr/` ;
  2. le choix enregistré dans `localStorage.preferredLanguage` ;
  3. la langue du navigateur ;
  4. le français.
- Un sélecteur FR/EN, de même style que celui du header, bascule le texte sur place et enregistre le choix.
- Le lien de retour mène à `/fr/` ou `/en/` selon la langue affichée.
- Sans JavaScript, le français s'affiche et l'océan est absent.
- La page garde `noindex`.

## Lot 2 : habillage

### Header toujours visible

- `.site-header` passe en `position: sticky; top: 0`, avec un `z-index` au-dessus du contenu, un fond `color-mix(in oklch, var(--color-bg) 82%, transparent)` et `backdrop-filter: blur(10px)`.
- `scroll-padding-top` (dans `base.css`) suit la hauteur réelle du header, via une variable `--header-h` mise à jour par un `ResizeObserver`. Valeur par défaut en CSS : `4rem`. Les ancres `#projects`, `#about`, etc. ne passent ainsi pas sous le header.
- Barre de progression de lecture : un pseudo-élément de 2 px en `--color-accent` au bas du header, animé en CSS par `animation-timeline: scroll(root)`. Elle est placée sous `@supports (animation-timeline: scroll())` et désactivée en mouvement réduit. Elle n'apparaît pas dans Firefox, qui ne gère pas encore cette propriété.
- Le portrait ASCII du hero, qui reste figé pendant le défilement, se fixe sous le header (`top: var(--header-h)`) au lieu de `top: 0`.
- Sur mobile, le header garde ses deux lignes, avec un remplissage vertical réduit.

### Curseur

Un nouveau composant `Cursor.astro` est inclus dans `Base.astro`.

- Il comprend un point de 6 px en `--color-accent`, collé à la souris, et un anneau de 32 px avec une bordure de 1,5 px en `--color-accent`, qui suit avec un amorti (interpolation d'environ 0,2 par image).
- Il n'est actif que si `matchMedia('(pointer: fine)')` est vrai. Sur écran tactile, rien ne change.
- Le curseur natif n'est masqué (`html.has-cursor { cursor: none }`, étendu aux liens et boutons) qu'une fois le script lancé. Si le JavaScript échoue, le curseur normal reste.
- Les champs de saisie gardent leur curseur texte natif. L'iframe Botpress garde le sien : le curseur personnalisé est masqué quand la souris la survole.
- Sur un élément cliquable (`a, button, [role="button"], summary, label`), l'anneau passe à 48 px et prend un fond accent à 15 %.
- Le curseur est masqué quand la souris quitte la fenêtre.
- En mouvement réduit, l'anneau suit sans amorti. La boucle `requestAnimationFrame` ne tourne que pendant que la souris bouge.
- Les éléments ont `pointer-events: none` et `aria-hidden="true"`.
- Avec le routeur client (lot 3), le composant est conservé d'une page à l'autre (`transition:persist`).

### Sélection de texte

Dans `base.css` : `::selection { background: var(--color-accent); color: var(--color-on-accent); }`. La règle vaut pour les deux thèmes, puisque les variables changent avec `light-dark()`.

### Barre de défilement

Dans `base.css` :

- `html { scrollbar-color: var(--color-border) var(--color-bg); scrollbar-width: thin; }` pour Chrome 121+ et Firefox ;
- `::-webkit-scrollbar` (10 px), poignée arrondie en `--color-border`, qui passe en `--color-accent` au survol, et piste en `--color-bg`, pour Safari. Chrome ignore ces règles dès que `scrollbar-color` est défini, ce qui est voulu.

## Lot 3 : traduction sans rechargement

### Approche retenue

Le routeur client d'Astro (`<ClientRouter />` de `astro:transitions`) est ajouté dans le `<head>` de `Base.astro`, pour tout le site.

- Au clic sur un lien interne, dont le sélecteur FR/EN, Astro récupère la page cible, échange le document avec un fondu et met l'URL à jour.
- Les URL `/fr/…` et `/en/…`, le référencement, les `hreflang` et le fonctionnement sans JavaScript ne changent pas.
- Les approches écartées : une page unique contenant les deux langues (HTML doublé, fiches Markdown mal adaptées, URL par langue perdues) et un échange maison du `<main>` (il refait le routeur, avec le même travail sur les scripts).

### Position conservée au changement de langue

Le texte FR et le texte EN n'ont pas la même longueur : garder `scrollY` tel quel ne suffit pas.

- Au clic sur le sélecteur de langue, le script note la dernière section (`main [id]`) dont le haut est au-dessus du milieu de l'écran, et le décalage de l'écran dans cette section, en proportion de sa hauteur.
- Après l'échange (`astro:after-swap`), il fait défiler jusqu'à la même section et au même décalage proportionnel, sans animation.
- Pour les autres liens, le comportement par défaut d'Astro s'applique : haut de page, ou ancre.
- Le lien de langue utilise `data-astro-history="replace"` : changer de langue n'empile pas d'entrée dans l'historique.

### Scripts à adapter

Les scripts de composant d'Astro ne s'exécutent qu'une fois. Chacun passe dans un écouteur `astro:page-load` et nettoie ses effets sur `astro:before-swap` (boucles `requestAnimationFrame`, écouteurs sur `window`, observateurs) :

| Composant | Point d'attention |
| --- | --- |
| `HeroAscii.astro` | boucle d'animation et écouteur `scroll` sur `window` à arrêter |
| `SkillGraph.astro` | simulation d3-force à arrêter |
| `ProjectGrid.astro` | filtres à rebrancher |
| `Gallery.astro` | dialogue de la visionneuse à rebrancher |
| `PowerBiEmbed.astro` | bouton de chargement à rebrancher |
| `ThemeToggle.astro` | état du bouton à resynchroniser |
| `LangSwitch.astro` | enregistrement du choix et mémorisation de la position |
| `Chatbot.astro` | voir ci-dessous |

`Contributions.astro` n'a pas de script : il n'y a rien à adapter.

Le script en ligne du thème (`Base.astro`) est aussi rejoué sur `astro:after-swap`, pour éviter un éclair clair ou sombre.

### Chatbot

Botpress ajoute ses iframes (`.bpWebchat`, `.bpFab`) et son style dans `<body>`, que l'échange remplace.

- Le script note tout ce que Botpress ajoute dans `<head>` et `<body>`. Sur `astro:before-swap`, il marque ces éléments `data-astro-transition-persist` et place un jumeau vide (`<template>`) dans le nouveau document. Le routeur les conserve alors tels quels : avec `moveBefore()` (Chrome 133+), l'iframe garde son état et la conversation ouverte survit au changement de page. Ailleurs, l'iframe se recharge.
- Le bouton « Une question ? » reste masqué si Botpress est déjà chargé.
- Botpress reste dans la langue de sa configuration, comme aujourd'hui.

### Sans JavaScript ou navigateur ancien

Le routeur se replie sur une navigation classique. Rien ne casse : on retrouve simplement le rechargement d'aujourd'hui.

## Lot 4 : requins ASCII

### Moteur

- Les fichiers `src/` d'ascii-sharks sont copiés dans `src/lib/ocean/`, sans `react.tsx`. Chaque fichier commence par la mention de l'origine et de la licence MIT, et le texte complet de la licence est ajouté dans `src/lib/ocean/LICENSE`.
- Le code est en TypeScript sans dépendance : rien n'est ajouté à `package.json`.
- Adaptations au moteur, chacune commentée dans le code :
  1. **Fond** : option `transparent`. Le canvas est créé avec `alpha: true` et effacé au lieu d'être rempli de noir.
  2. **Couleurs** : option `palette` (fond, poissons, requins, accent), au lieu de couleurs écrites en dur.
  3. **Pas de sang** : l'événement `eat` produit des bulles en couleur d'accent au lieu des éclaboussures rouges. Les poissons mangés disparaissent puis réapparaissent comme dans l'original.
  4. **Sans poissons** : option `fish: false` pour l'easter egg.
  5. **Traversée** : pour l'easter egg, le requin entre par un bord, traverse l'écran et sort par l'autre bord, puis le moteur s'arrête. Il faudra lire `world.ts` pour choisir le plus simple : forcer cap et position du requin, ou piloter un point d'attraction.
- Le moteur sait déjà se mettre en pause hors écran, respecter le mouvement réduit (une seule image fixe) et se détruire (`destroy()`). La 404 et l'accueil appellent `destroy()` sur `astro:before-swap`.

### 404

- Canvas plein écran, en `position: fixed`, derrière le contenu. Les requins et bancs de poissons sont ceux de la configuration par défaut d'ascii-sharks.
- L'océan reste sombre quel que soit le thème. La palette est celle d'origine, avec l'accent du site pour les bulles.
- Comme dans l'original, les poissons fuient la souris et un clic fait une éclaboussure.
- Le contenu (« 404 », texte, sélecteur, lien) est posé sur un voile `--color-scrim` semi-transparent, en `--color-on-scrim`, avec un contraste AA.
- En mouvement réduit, une image fixe de l'océan s'affiche.

### Easter egg de l'accueil

Un nouveau composant `SharkPass.astro` est inclus seulement sur l'accueil (`/fr/` et `/en/`).

- Un canvas `position: fixed`, en bas de l'écran, sur 35 % de la hauteur. Il a `pointer-events: none`, `aria-hidden="true"` et un `z-index` sous le contenu, avec une opacité de 0,35.
- Un seul requin, de type `classic`, sans poissons, sur fond transparent. Le corps garde l'ombrage gris d'origine, lisible sur les deux thèmes à 35 % d'opacité. Les reflets prennent `--color-accent`, relu au début de chaque traversée.
- Premier passage 20 à 40 s après l'arrivée sur la page, puis un passage toutes les 60 à 120 s, au hasard. Le sens est tiré au hasard et une traversée dure 8 à 12 s.
- Le moteur n'est créé que pour une traversée et détruit juste après : aucune boucle ne tourne entre deux passages.
- Pas de passage si l'onglet est caché (`visibilitychange`) ni en mouvement réduit. Le minuteur est annulé sur `astro:before-swap`.
- Les sections qui ont un fond opaque masquent le requin : c'est voulu, il passe « derrière » le site.

## Lot 5 : « À propos »

- Le texte reste le même. Dans `home.ts`, les mots-clés sont marqués avec `[[…]]` :
  - FR : `[[Data Analyst]]`, `[[Master Informatique]]`, `[[Pragmatique et autonome]]`, `[[Claude Code]]`, `[[encyClaupedia]]` ;
  - EN : `[[Data Analyst]]`, `[[Master’s in Computer Science]]`, `[[Pragmatic and autonomous]]`, `[[Claude Code]]`, `[[encyClaupedia]]`.
- `About.astro` découpe chaque paragraphe au build. Un mot-clé devient `<strong class="kw">`, en `--color-accent` et de graisse 600. « Claude Code » prend `--color-claude`.
- Les paragraphes passent en `--step-1`, avec une largeur maximale de 40rem et la couleur `--color-text` au lieu de `--color-muted`.
- **Texte qui s'allume au défilement** : chaque mot est entouré au build d'un `<span class="w">`. Sous `@supports (animation-timeline: view())` et `prefers-reduced-motion: no-preference`, chaque mot passe d'une opacité de 0,25 à 1 avec `animation-timeline: view()` et `animation-range: entry 20% cover 45%`. Les mots d'une même ligne partagent la même position, donc le texte s'allume ligne par ligne. Les mots-clés suivent la même animation.
- Sans support de cette propriété (Firefox aujourd'hui) ou en mouvement réduit, le texte s'affiche normalement, sans JavaScript.
- Les `<span>` sont en ligne et n'ajoutent aucune espace : la lecture par un lecteur d'écran ne change pas.
- La liste Formation / Recherche / Langues / Hors du code et la carte des contributions ne changent pas.

## Vérification

Les fonctions pures (découpage des mots-clés, traversée du requin) ont des tests `node:test`, lancés par `npm test` sans dépendance ajoutée : Node 24 exécute le TypeScript directement. Chaque lot est vérifié par `npm run build` sans erreur, puis à la main dans Chrome avec `npm run preview` :

- accueil et une fiche projet, en FR et en EN, en thème sombre et clair, sur grand écran et en 390 px de large ;
- 404 : `/page-inconnue`, `/en/page-inconnue` et `/fr/page-inconnue`, sélecteur FR/EN, lien de retour ;
- changement de langue en haut, au milieu (section Expérience) et en bas de l'accueil : même section à l'écran après l'échange, aucun portrait ASCII en double, aucune erreur dans la console ;
- chatbot ouvert, puis changement de langue : la fenêtre reste ouverte ;
- curseur sur des liens, des boutons, un champ et l'iframe du chatbot ;
- émulation du mouvement réduit : pas d'anneau amorti, pas de texte qui s'allume, pas de requin sur l'accueil, image fixe sur la 404 ;
- metas : HTML généré de `/` relu, et carte de partage testée si possible avec un outil d'aperçu Open Graph après le déploiement.

## Risques

- **Routeur client** : c'est le changement le plus large. Un script mal nettoyé fait tourner deux boucles d'animation. La vérification « aucun portrait en double » et la console couvrent ce risque.
- **Botpress** : le déplacement de ses éléments dépend de leur structure actuelle. Si elle change, le chatbot se refermera au changement de page, sans autre conséquence.
- **Moteur des requins** : `renderer.ts` fait 35 Ko et n'est pas pensé pour un fond transparent. Si l'adaptation se révèle trop lourde, l'easter egg utilisera un sprite ASCII de requin animé à la main, plus simple, et la 404 gardera le moteur complet.
