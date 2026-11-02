# Finitions du site : plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** appliquer la spec `docs/superpowers/specs/2026-11-02-site-polish-design.md` : corrections rapides, habillage (header, curseur, sélection, barre de défilement), traduction sans rechargement, requins ASCII (404 et accueil) et « À propos » façon mysticsaba.

**Architecture:** site Astro 7 statique (GitHub Pages). Le routeur client d'Astro (`<ClientRouter />`) échange les pages sans rechargement. Chaque script de composant passe par un petit utilitaire `onPage()`, qui le relance à chaque page et le nettoie avant l'échange. Le moteur ascii-sharks (MIT) est copié dans `src/lib/ocean/` et reçoit des options : fond transparent, couleurs, bulles au lieu du sang, traversée unique.

**Tech Stack:** Astro 7.4.4, TypeScript, CSS natif (scroll-driven animations, `light-dark()`), `node:test` sous Node 24 (TypeScript exécuté directement), Chrome via `npm run preview` pour la vérification manuelle.

## Global Constraints

- Branche `site-polish`. Aucun push ni fusion sans accord explicite de Sefer.
- Aucune dépendance ajoutée à `package.json`. Seul le script `"test"` est ajouté.
- Commentaires du projet en français. Le code copié d'ascii-sharks garde ses commentaires anglais, et chaque adaptation y est signalée par `Adaptation:`.
- Ne jamais modifier un chiffre, un rôle ou une date. Les textes changent seulement là où la spec le dit.
- Toute animation respecte `prefers-reduced-motion: reduce`. `base.css` coupe déjà animations et transitions dans ce cas.
- Les deux thèmes (`html[data-theme='light'|'dark']`) restent lisibles. Les couleurs passent par les variables de `src/styles/tokens.css`.
- Commits : messages en anglais au format `type: description`, terminés par la ligne `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Après chaque tâche : `npm run build` doit réussir. Après les tâches qui ont des tests : `npm test` doit réussir.

---

### Task 1 : chiffres vidéo et metas de partage

**Files:**
- Modify: `src/i18n/home.ts:96` et `src/i18n/home.ts:225`
- Modify: `src/i18n/ui.ts:15-16` et `src/i18n/ui.ts:58-59`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: rien.
- Produces: `meta.description` (FR et EN) dans `ui.ts`, réutilisée par la page racine.

- [ ] **Step 1 : raccourcir les chiffres**

Dans `src/i18n/home.ts`, remplacer :

```ts
          stat: 'Meilleure publication : environ 350 000 vues et 20 000 likes',
```

par :

```ts
          stat: 'Meilleure publication : environ 350k vues et 20k likes',
```

et :

```ts
          stat: 'Best post: about 350,000 views and 20,000 likes',
```

par :

```ts
          stat: 'Best post: about 350k views and 20k likes',
```

- [ ] **Step 2 : descriptions sans répéter le titre**

Dans `src/i18n/ui.ts`, remplacer la description FR :

```ts
  'meta.description':
    'Portfolio de Sefer Tasdemir, Data Scientist : pipelines de données, BI et machine learning. En Master Informatique à Lyon 2.',
```

par :

```ts
  'meta.description':
    'Pipelines de données, BI et machine learning. En Master Informatique à Lyon 2, je cherche un stage à partir d’avril 2027.',
```

et la description EN :

```ts
  'meta.description':
    'Portfolio of Sefer Tasdemir, Data Scientist: data pipelines, BI and machine learning. Master’s student in Computer Science at Lyon 2.',
```

par :

```ts
  'meta.description':
    'Data pipelines, BI and machine learning. Master’s student in Computer Science at Lyon 2, looking for an internship from April 2027.',
```

- [ ] **Step 3 : metas de la page racine**

Remplacer tout `src/pages/index.astro` par :

```astro
---
import { useTranslations } from '../i18n/ui';

const site = Astro.site as URL;
const t = useTranslations('fr');
const title = t('meta.title');
const description = t('meta.description');
const image = new URL('/assets/img/og-fr.png', site).href;
---

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="google-site-verification" content="_YOwXn6Ifjhj_kEnAddJc_UjdSoupw9G3zk07rka1QI" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={new URL('/', site).href} />
    <link rel="alternate" hreflang="fr" href={new URL('/fr/', site).href} />
    <link rel="alternate" hreflang="en" href={new URL('/en/', site).href} />
    <link rel="alternate" hreflang="x-default" href={new URL('/', site).href} />

    <!-- Aperçu de partage : la racine ne fait que rediriger, elle porte donc sa propre carte. -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Sefer Tasdemir" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={new URL('/', site).href} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={title} />
    <meta property="og:locale" content="fr_FR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image} />

    <script is:inline>
      (function () {
        var lang = null;
        try {
          lang = localStorage.getItem('preferredLanguage');
        } catch (e) {}
        if (lang !== 'fr' && lang !== 'en') {
          lang = (navigator.language || '').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
        }
        location.replace('/' + lang + '/' + location.hash);
      })();
    </script>
    <noscript><meta http-equiv="refresh" content="0; url=/fr/" /></noscript>
  </head>
  <body>
    <p><a href="/fr/">Français</a> · <a href="/en/">English</a></p>
  </body>
</html>
```

- [ ] **Step 4 : vérifier le build et le HTML généré**

Run: `npm run build && grep -o '<meta name="description"[^>]*>' dist/index.html dist/fr/index.html dist/en/index.html && grep -c 'og:image' dist/index.html && grep -o '350k[^<]*' dist/fr/index.html dist/en/index.html`

Expected : le build réussit. Une seule description par fichier, sans « Portfolio de ». Au moins 2 occurrences de `og:image` dans `dist/index.html`. « 350k vues et 20k likes » en FR et « 350k views and 20k likes » en EN.

- [ ] **Step 5 : commit**

```bash
git add src/i18n/home.ts src/i18n/ui.ts src/pages/index.astro
git commit -m "fix: shorten the video stats and stop repeating the share description

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2 : « À propos », mots-clés colorés et texte qui s'allume (TDD)

**Files:**
- Create: `src/lib/rich.ts`
- Create: `src/lib/rich.test.ts`
- Modify: `package.json` (script `test`)
- Modify: `src/i18n/home.ts:156-158` et `src/i18n/home.ts:285-287`
- Modify: `src/components/About.astro`

**Interfaces:**
- Produces: `parseRich(source: string): RichPart[]` avec `interface RichPart { text: string; keyword: boolean }`, et `words(text: string): string[]`.
- Produces: le script `npm test` (`node --test "src/**/*.test.ts"`), utilisé aussi par la Task 6.

- [ ] **Step 1 : ajouter le script de test**

Dans `package.json`, bloc `scripts`, ajouter `"test"` après `"preview"` :

```json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "node --test \"src/**/*.test.ts\""
  },
```

- [ ] **Step 2 : écrire les tests qui échouent**

Create `src/lib/rich.test.ts` :

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseRich, words } from './rich.ts';

test('parseRich isole un mot-clé au milieu d’une phrase', () => {
  assert.deepEqual(parseRich('Un an comme [[Data Analyst]] aux ATMB.'), [
    { text: 'Un an comme ', keyword: false },
    { text: 'Data Analyst', keyword: true },
    { text: ' aux ATMB.', keyword: false },
  ]);
});

test('parseRich gère un mot-clé en tête et plusieurs mots-clés', () => {
  assert.deepEqual(parseRich('[[Pragmatique et autonome]], avec [[Claude Code]] et [[encyClaupedia]].'), [
    { text: 'Pragmatique et autonome', keyword: true },
    { text: ', avec ', keyword: false },
    { text: 'Claude Code', keyword: true },
    { text: ' et ', keyword: false },
    { text: 'encyClaupedia', keyword: true },
    { text: '.', keyword: false },
  ]);
});

test('parseRich laisse un texte sans mot-clé intact', () => {
  assert.deepEqual(parseRich('Rien à signaler.'), [{ text: 'Rien à signaler.', keyword: false }]);
});

test('words garde les espaces et ne coupe pas sur l’espace insécable', () => {
  assert.deepEqual(words('à Lyon 2, je'), ['à', ' ', 'Lyon 2,', ' ', 'je']);
  assert.deepEqual(words(' Data Analyst'), [' ', 'Data', ' ', 'Analyst']);
});
```

- [ ] **Step 3 : vérifier l'échec**

Run: `npm test`
Expected : FAIL, avec une erreur de module introuvable `./rich.ts`.

- [ ] **Step 4 : implémenter**

Create `src/lib/rich.ts` :

```ts
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
```

- [ ] **Step 5 : vérifier le succès**

Run: `npm test`
Expected : PASS, 4 tests.

- [ ] **Step 6 : marquer les mots-clés dans les textes**

Dans `src/i18n/home.ts`, remplacer les trois paragraphes FR de `about` par :

```ts
        'Je suis Sefer Tasdemir. Après un BUT Informatique parcours AGED à l’IUT d’Annecy et un an d’alternance comme [[Data Analyst]] aux Autoroutes et tunnel du Mont-Blanc, je suis en [[Master Informatique]] à Lyon 2, avec le parcours SISE envisagé en M2.',
        '[[Pragmatique et autonome]], je veux mettre mes compétences en pratique au sein d’une équipe avec laquelle je partage mes valeurs.',
        'En dehors des cours, je construis mes propres outils avec [[Claude Code]] et je tiens une veille sur les outils d’IA, [[encyClaupedia]].',
```

et les trois paragraphes EN par :

```ts
        'I’m Sefer Tasdemir. After a BUT in Computer Science (AGED track) at IUT d’Annecy and a year as an apprentice [[Data Analyst]] at Autoroutes et tunnel du Mont-Blanc, I’m now doing a [[Master’s in Computer Science]] at Lyon 2, with the SISE track planned for the second year.',
        '[[Pragmatic and autonomous]], I want to put my skills into practice within a team whose values I share.',
        'Outside of class, I build my own tools with [[Claude Code]] and keep a watch on AI tools, [[encyClaupedia]].',
```

Vérifier qu'aucun autre fichier ne lit ces paragraphes : `grep -rn "about.paragraphs\|\.paragraphs" src` ne doit renvoyer que `src/components/About.astro`.

- [ ] **Step 7 : rendre les mots-clés et l'effet de défilement**

Dans `src/components/About.astro`, remplacer le frontmatter et le début du gabarit :

```astro
---
import { home } from '../i18n/home';
import { useTranslations, type Lang } from '../i18n/ui';
import Contributions from './Contributions.astro';

const { lang } = Astro.props as { lang: Lang };
const t = useTranslations(lang);
const copy = home[lang].about;
---

<section id="about" class="section container">
  <h2>{t('nav.about')}</h2>
  {copy.paragraphs.map((paragraph) => <p class="lead">{paragraph}</p>)}
```

par :

```astro
---
import { home } from '../i18n/home';
import { useTranslations, type Lang } from '../i18n/ui';
import { parseRich, words } from '../lib/rich';
import Contributions from './Contributions.astro';

const { lang } = Astro.props as { lang: Lang };
const t = useTranslations(lang);
const copy = home[lang].about;
// Chaque mot est entouré au build : le CSS l'allume au défilement, sans JavaScript.
const wrap = (text: string) =>
  words(text).map((word) => (word.trim() === '' ? word : <span class="w">{word}</span>));
---

<section id="about" class="section container">
  <h2>{t('nav.about')}</h2>
  <div class="story">
    {
      copy.paragraphs.map((paragraph) => (
        <p>
          {parseRich(paragraph).map((part) =>
            part.keyword ? (
              <strong class:list={['kw', { claude: part.text === 'Claude Code' }]}>{wrap(part.text)}</strong>
            ) : (
              wrap(part.text)
            ),
          )}
        </p>
      ))
    }
  </div>
```

Puis, dans le `<style>` du même fichier, ajouter avant `dl {` :

```css
  .story {
    max-width: 40rem;
    margin-top: var(--space-s);
  }

  .story p {
    margin: 0 0 var(--space-s);
    font-size: var(--step-1);
    line-height: 1.5;
  }

  .kw {
    color: var(--color-accent);
    font-weight: 600;
  }

  .kw.claude {
    color: var(--color-claude);
  }

  /* Le texte s'allume ligne à ligne en entrant dans l'écran. Sans support
     (Firefox aujourd'hui) ou en mouvement réduit, il s'affiche normalement. */
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .w {
        animation: light linear both;
        animation-timeline: view();
        animation-range: entry 20% cover 45%;
      }
    }
  }

  @keyframes light {
    from {
      opacity: 0.25;
    }

    to {
      opacity: 1;
    }
  }
```

- [ ] **Step 8 : vérifier**

Run: `npm run build && grep -c 'class="w' dist/fr/index.html && grep -o '\[\[' dist/fr/index.html dist/en/index.html | wc -l`
Expected : le build réussit, le premier compte dépasse 50 et le second vaut `0` (aucun crochet affiché).

Puis `npm run preview`. Dans Chrome, sur `http://localhost:4321/fr/#about` et `/en/#about`, vérifier :
- les cinq mots-clés en bleu, « Claude Code » en orange Claude ;
- les lignes qui passent du gris au plein en défilant ;
- aucun espace manquant ni en trop entre les mots ;
- en mouvement réduit émulé (DevTools > Rendering), le texte est plein d'emblée.

- [ ] **Step 9 : commit**

```bash
git add package.json src/lib/rich.ts src/lib/rich.test.ts src/i18n/home.ts src/components/About.astro
git commit -m "feat: highlight About keywords and light the text up on scroll

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3 : routeur client (changer de langue sans recharger)

**Files:**
- Create: `src/lib/lifecycle.ts`
- Modify: `src/layouts/Base.astro`
- Modify: `src/components/LangSwitch.astro`
- Modify: `src/components/HeroAscii.astro` (script)
- Modify: `src/components/SkillGraph.astro` (script)
- Modify: `src/components/ProjectGrid.astro` (script)
- Modify: `src/components/Gallery.astro` (script)
- Modify: `src/components/PowerBiEmbed.astro` (script)
- Modify: `src/components/ThemeToggle.astro` (script)
- Modify: `src/components/Chatbot.astro` (script)

**Interfaces:**
- Produces: `onPage(setup: () => void | (() => void)): void` dans `src/lib/lifecycle.ts`. Les Tasks 4 et 8 l'utilisent.

- [ ] **Step 1 : l'utilitaire de cycle de vie**

Create `src/lib/lifecycle.ts` :

```ts
/**
 * Avec le routeur client, un script de composant ne s'exécute qu'une fois pour tout le site.
 * `onPage` relance `setup` à chaque page affichée et appelle le nettoyage qu'il renvoie
 * juste avant l'échange suivant (boucles d'animation, écouteurs sur window, observateurs).
 */
export function onPage(setup: () => void | (() => void)) {
  document.addEventListener('astro:page-load', () => {
    const cleanup = setup();
    if (cleanup) document.addEventListener('astro:before-swap', cleanup, { once: true });
  });
}
```

- [ ] **Step 2 : activer le routeur et garder le thème**

Dans `src/layouts/Base.astro`, ajouter l'import après la ligne `import Header from '../components/Header.astro';` :

```ts
import { ClientRouter } from 'astro:transitions';
```

Ajouter `<ClientRouter />` juste avant `<script is:inline>` dans le `<head>`, et remplacer le script en ligne du thème par :

```astro
    <ClientRouter />
    <script is:inline>
      (function () {
        var theme = null;
        try {
          theme = localStorage.getItem('preferredTheme');
        } catch (e) {}
        if (theme !== 'light' && theme !== 'dark') {
          theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        document.documentElement.dataset.theme = theme;
        // Le routeur remplace les attributs de <html> : la page suivante reçoit le thème courant.
        document.addEventListener('astro:before-swap', function (event) {
          event.newDocument.documentElement.dataset.theme = document.documentElement.dataset.theme;
        });
      })();
    </script>
```

- [ ] **Step 3 : sélecteur de langue, même section à l'écran**

Dans `src/components/LangSwitch.astro`, ajouter `data-astro-history="replace"` sur le lien, après `data-lang={code}` :

```astro
          data-lang={code}
          data-astro-history="replace"
```

Remplacer le `<script>` par :

```astro
<script>
  // Le texte FR et le texte EN n'ont pas la même longueur : on retient la section à l'écran
  // et la position dans cette section, puis on la retrouve dans l'autre langue.
  let anchor: { id: string; ratio: number; y: number } | null = null;

  const currentAnchor = () => {
    let section: HTMLElement | null = null;
    for (const candidate of document.querySelectorAll<HTMLElement>('main section[id]')) {
      if (candidate.getBoundingClientRect().top <= innerHeight / 2) section = candidate;
    }
    if (!section) return { id: '', ratio: 0, y: scrollY };
    const box = section.getBoundingClientRect();
    return { id: section.id, ratio: -box.top / Math.max(1, box.height), y: scrollY };
  };

  // Capture : on note la position avant que le routeur ne prenne le clic.
  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('.lang-switch a');
      if (!link) return;
      try {
        localStorage.setItem('preferredLanguage', link.dataset.lang ?? '');
      } catch {}
      anchor = currentAnchor();
    },
    true,
  );

  document.addEventListener('astro:after-swap', () => {
    if (!anchor) return;
    const { id, ratio, y } = anchor;
    anchor = null;
    const section = id ? document.getElementById(id) : null;
    const top = section ? section.getBoundingClientRect().top + scrollY + ratio * section.offsetHeight : y;
    scrollTo({ top, behavior: 'instant' });
  });
</script>
```

- [ ] **Step 4 : HeroAscii relancé et nettoyé**

Dans `src/components/HeroAscii.astro`, ajouter en première ligne du `<script>` :

```ts
  import { onPage } from '../lib/lifecycle';

```

Remplacer :

```ts
  const pre = document.querySelector<HTMLPreElement>('[data-ascii]');
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sans JS ou en mouvement réduit, le <pre> statique reste affiché tel quel.
  if (pre && hero && !reduced) {
```

par :

```ts
  onPage(() => {
    const pre = document.querySelector<HTMLPreElement>('[data-ascii]');
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sans JS ou en mouvement réduit, le <pre> statique reste affiché tel quel.
    if (!pre || !hero || reduced) return;

```

Remplacer :

```ts
    layout();
    wake();
    new ResizeObserver(() => {
      layout();
      wake();
    }).observe(pre);
```

par :

```ts
    layout();
    wake();
    const resizer = new ResizeObserver(() => {
      layout();
      wake();
    });
    resizer.observe(pre);
```

Remplacer la fin du script :

```ts
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    new MutationObserver(wake).observe(document.documentElement, { attributeFilter: ['data-theme'] });
  }
</script>
```

par :

```ts
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const themeWatcher = new MutationObserver(wake);
    themeWatcher.observe(document.documentElement, { attributeFilter: ['data-theme'] });

    // Avant de quitter la page : plus de boucle, d'écouteur ni d'observateur.
    return () => {
      cancelAnimationFrame(frame);
      frame = 0;
      removeEventListener('scroll', onScroll);
      resizer.disconnect();
      themeWatcher.disconnect();
    };
  });
</script>
```

- [ ] **Step 5 : SkillGraph relancé et nettoyé**

Dans `src/components/SkillGraph.astro`, ajouter après `import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force';` :

```ts
  import { onPage } from '../lib/lifecycle';
```

Dans `draw()`, remplacer :

```ts
    root.dataset.ready = 'true';
  }
```

par :

```ts
    root.dataset.ready = 'true';
    return simulation;
  }
```

Remplacer tout le bloc final, de `document.querySelectorAll<HTMLElement>('[data-skill-graph]').forEach((root) => {` jusqu'à `</script>`, par :

```ts
  onPage(() => {
    const cleanups: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>('[data-skill-graph]').forEach((root) => {
      const svg = root.querySelector<SVGSVGElement>('svg.stage')!;
      const toggle = root.querySelector<HTMLButtonElement>('.toggle')!;
      const data: GraphData = JSON.parse(
        root.querySelector('script[type="application/json"]')?.textContent ?? '{}',
      );

      const showList = (list: boolean) => {
        if (list) root.dataset.view = 'list';
        else delete root.dataset.view;
        toggle.textContent = (list ? toggle.dataset.graph : toggle.dataset.list) ?? '';
      };

      toggle.addEventListener('click', () => showList(root.dataset.view !== 'list'));

      if (getComputedStyle(svg).display === 'none' && !matchMedia('(min-width: 48rem)').matches) {
        return;
      }
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Équivalent de client:visible, sans framework : d3-force n'arrive qu'à l'approche du graphe.
      let simulation: { stop: () => void } | undefined;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          draw(root, svg, data)
            .then((running) => (simulation = running))
            .catch(() => showList(true));
        },
        { rootMargin: '200px' },
      );
      observer.observe(root);
      cleanups.push(() => {
        observer.disconnect();
        simulation?.stop();
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  });
</script>
```

- [ ] **Step 6 : ProjectGrid, Gallery, PowerBiEmbed et ThemeToggle**

Ces quatre scripts n'ont que des écouteurs posés sur des éléments de la page, qui disparaissent avec elle. Il suffit de les relancer.

`src/components/ProjectGrid.astro`, nouveau `<script>` :

```astro
<script>
  import { onPage } from '../lib/lifecycle';

  onPage(() => {
    document.querySelectorAll<HTMLElement>('[data-project-grid]').forEach((root) => {
      const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-filter]')];
      const cards = [...root.querySelectorAll<HTMLElement>('[data-categories]')];
      const status = root.querySelector<HTMLElement>('[role="status"]')!;

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const filter = button.dataset.filter ?? 'all';
          buttons.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
          cards.forEach((card) => {
            card.hidden = filter !== 'all' && !card.dataset.categories?.split(' ').includes(filter);
          });
          const shown = cards.filter((card) => !card.hidden).length;
          status.textContent = (status.dataset.template ?? '').replace('{n}', String(shown));
        });
      });
    });
  });
</script>
```

`src/components/Gallery.astro` : ajouter `import { onPage } from '../lib/lifecycle';` en tête du `<script>`, remplacer `document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((gallery) => {` par :

```ts
  onPage(() => {
    document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((gallery) => {
```

ré-indenter le corps de deux espaces, et fermer avec `    });\n  });` au lieu de `  });` avant `</script>`. Le corps ne change pas.

`src/components/PowerBiEmbed.astro`, nouveau `<script>` :

```astro
<script>
  import { onPage } from '../lib/lifecycle';

  onPage(() => {
    document.querySelectorAll<HTMLElement>('[data-embed]').forEach((frame) => {
      frame.querySelector('button')?.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.src = frame.dataset.embed ?? '';
        iframe.title = frame.dataset.title ?? '';
        iframe.allowFullscreen = true;
        frame.replaceChildren(iframe);
        iframe.focus();
      });
    });
  });
</script>
```

`src/components/ThemeToggle.astro`, nouveau `<script>` :

```astro
<script>
  import { onPage } from '../lib/lifecycle';

  onPage(() => {
    const root = document.documentElement;
    document.querySelectorAll<HTMLButtonElement>('.theme-toggle').forEach((button) => {
      button.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
      button.addEventListener('click', () => {
        const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = theme;
        button.setAttribute('aria-pressed', String(theme === 'dark'));
        try {
          localStorage.setItem('preferredTheme', theme);
        } catch {}
      });
    });
  });
</script>
```

- [ ] **Step 7 : le chatbot survit au changement de page**

Dans `src/components/Chatbot.astro`, remplacer tout le `<script>` par :

```astro
<script>
  import { onPage } from '../lib/lifecycle';

  // Botpress n'est demandé qu'au clic : aucune requête tierce avant cette intention.
  const INJECT = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
  const CONFIG = 'https://files.bpcontent.cloud/2025/04/12/10/20250412104746-SVC1SOL9.js';
  const PERSIST = 'data-astro-transition-persist';

  const load = (src: string) =>
    new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(src));
      document.head.append(script);
    });

  // Une ouverture demandée trop tôt est perdue et laisse la fenêtre vide :
  // on la renouvelle jusqu'à ce que l'application interne soit montée.
  const openWhenMounted = (open: () => void) =>
    new Promise<void>((resolve) => {
      const started = Date.now();
      const timer = setInterval(() => {
        open();
        const iframe = document.querySelector<HTMLIFrameElement>('.bpWebchat');
        const nodes = iframe?.contentDocument?.body?.querySelectorAll('*').length ?? 0;
        if (nodes > 2 || Date.now() - started > 10000) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });

  // Tout ce que Botpress ajoute à <head> et <body> (iframes, styles, scripts) est noté,
  // pour le garder d'une page à l'autre. Les scripts relancés par le routeur sont ignorés.
  let loaded = false;
  const added = new Set<Element>();
  const watcher = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node instanceof HTMLScriptElement && !/botpress|bpcontent/.test(node.src)) continue;
        added.add(node);
      }
    }
  });
  const watch = () => {
    watcher.observe(document.head, { childList: true });
    watcher.observe(document.body, { childList: true });
  };

  // Le routeur garde un élément s'il trouve son jumeau dans la nouvelle page :
  // chaque élément de Botpress reçoit un identifiant et un jumeau vide.
  document.addEventListener('astro:before-swap', (event) => {
    if (!loaded) return;
    watcher.disconnect();
    const doc = event.newDocument;
    let n = 0;
    for (const element of added) {
      if (!element.isConnected) {
        added.delete(element);
        continue;
      }
      const id = `botpress-${n++}`;
      element.setAttribute(PERSIST, id);
      const twin = doc.createElement('template');
      twin.setAttribute(PERSIST, id);
      (element.parentElement === document.head ? doc.head : doc.body).append(twin);
    }
  });
  document.addEventListener('astro:after-swap', () => {
    if (loaded) watch();
  });

  onPage(() => {
    const button = document.querySelector<HTMLButtonElement>('.chatbot');
    if (!button) return;
    if (loaded) {
      button.hidden = true;
      return;
    }

    button.addEventListener('click', async () => {
      const label = button.textContent;
      button.disabled = true;
      button.textContent = button.dataset.loading ?? '';
      loaded = true;
      watch();
      try {
        await load(INJECT);
        const { botpress } = window as unknown as {
          botpress: { on: (event: string, handler: () => void) => void; open: () => void };
        };
        botpress.on('webchat:ready', async () => {
          await openWhenMounted(botpress.open);
          document.querySelector<HTMLButtonElement>('.chatbot')?.setAttribute('hidden', '');
          // Botpress masque ses iframes aux lecteurs d'écran et au clavier.
          document.querySelectorAll('.bpWebchat, .bpFab').forEach((frame) => {
            frame.removeAttribute('aria-hidden');
            frame.removeAttribute('tabindex');
            frame.setAttribute('title', label ?? 'Chatbot');
          });
        });
        await load(CONFIG);
      } catch {
        loaded = false;
        watcher.disconnect();
        added.clear();
        button.disabled = false;
        button.textContent = label;
      }
    });
  });
</script>
```

- [ ] **Step 8 : build**

Run: `npm run build`
Expected : succès, sans avertissement nouveau sur `astro:transitions`.

- [ ] **Step 9 : vérification manuelle dans Chrome**

Run: `npm run preview` (en arrière-plan), puis ouvrir `http://localhost:4321/fr/` dans Chrome avec la console ouverte.

Vérifier, en notant chaque résultat :
1. Clic sur EN tout en haut : la page passe en anglais par un fondu, sans rechargement (l'onglet Réseau montre un fetch de `/en/` et pas de document complet), et l'URL devient `/en/`.
2. Défiler jusqu'à « Expérience », cliquer sur FR : on retombe sur la même section.
3. Même test tout en bas (Contact).
4. Sur grand écran, défiler au milieu du hero (portrait à moitié en réseau), changer de langue : un seul portrait, pas de double animation. Dans la console, `document.querySelectorAll('.frame canvas').length` doit valoir `1`.
5. Thème clair, puis changer de langue et ouvrir une fiche projet : pas d'éclair sombre, le thème reste clair.
6. Sur une fiche projet : la galerie s'ouvre et se ferme, les flèches marchent, le bouton Power BI fonctionne (sur IMDb).
7. Sur l'accueil : les filtres de projets marchent après un aller-retour vers une fiche, et le graphe de compétences se dessine.
8. Ouvrir le chatbot, puis changer de langue : la fenêtre reste ouverte et le bouton « Une question ? » ne réapparaît pas.
9. Bouton Précédent du navigateur après une visite de fiche : retour à l'accueil sans erreur.
10. Aucune erreur dans la console sur l'ensemble du parcours.

- [ ] **Step 10 : commit**

```bash
git add src/lib/lifecycle.ts src/layouts/Base.astro src/components/LangSwitch.astro src/components/HeroAscii.astro src/components/SkillGraph.astro src/components/ProjectGrid.astro src/components/Gallery.astro src/components/PowerBiEmbed.astro src/components/ThemeToggle.astro src/components/Chatbot.astro
git commit -m "feat: switch language and pages without a full reload

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4 : header toujours visible, sélection et barre de défilement

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/HeroAscii.astro` (styles `.pin`)
- Modify: `src/styles/base.css`

**Interfaces:**
- Consumes: `onPage` (Task 3).
- Produces: la variable CSS `--header-h`, posée sur `<html>`.

- [ ] **Step 1 : header fixe, flouté, avec barre de progression**

Dans `src/components/Header.astro`, remplacer la règle `.site-header` :

```css
  .site-header {
    border-bottom: 1px solid var(--color-border);
  }
```

par :

```css
  .site-header {
    position: sticky;
    top: 0;
    z-index: 20;
    border-bottom: 1px solid var(--color-border);
    background: color-mix(in oklch, var(--color-bg) 82%, transparent);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  /* Progression de lecture, en CSS pur. Firefox ne gère pas encore scroll() : pas de barre. */
  @supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
      .site-header::after {
        content: '';
        position: absolute;
        inset-inline: 0;
        bottom: -1px;
        height: 2px;
        background: var(--color-accent);
        transform-origin: left;
        animation: progress linear both;
      }

      /* Règle à part, plus spécifique : le minifieur fusionnerait sinon la timeline dans le
         raccourci animation, que Chrome refuse. */
      .site-header.site-header::after {
        animation-timeline: scroll(root);
      }
    }
  }

  @keyframes progress {
    from {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }
```

Dans le bloc `@media (max-width: 44rem)`, ajouter :

```css
    .bar {
      padding-block: var(--space-xs);
    }
```

Ajouter à la fin du fichier :

```astro
<script>
  import { onPage } from '../lib/lifecycle';

  // La hauteur du header sert aux ancres (scroll-padding-top) et au hero figé.
  onPage(() => {
    const header = document.querySelector<HTMLElement>('.site-header');
    if (!header) return;
    const observer = new ResizeObserver(() =>
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`),
    );
    observer.observe(header);
    return () => observer.disconnect();
  });
</script>
```

- [ ] **Step 2 : ancres et hero sous le header**

Dans `src/styles/base.css`, remplacer :

```css
  scroll-padding-top: var(--space-l);
```

par :

```css
  scroll-padding-top: calc(var(--header-h, 4rem) + var(--space-s));
```

Dans `src/components/HeroAscii.astro`, remplacer :

```css
    min-height: calc(100svh - 4.5rem);
```

par :

```css
    min-height: calc(100svh - var(--header-h, 4.5rem));
```

et, dans le bloc `@media (min-width: 60rem) and (prefers-reduced-motion: no-preference)` :

```css
    :global(html[data-theme]) .pin {
      position: sticky;
      top: 0;
      min-height: 100svh;
    }
```

par :

```css
    :global(html[data-theme]) .pin {
      position: sticky;
      top: var(--header-h, 4rem);
      min-height: calc(100svh - var(--header-h, 4rem));
    }
```

- [ ] **Step 3 : sélection et barre de défilement**

Dans `src/styles/base.css`, ajouter dans la règle `html { ... }` existante :

```css
  scrollbar-color: var(--color-border) var(--color-bg);
  scrollbar-width: thin;
```

Puis ajouter après la règle `:focus-visible { ... }` :

```css
::selection {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

/* Safari ; Chrome et Firefox utilisent scrollbar-color ci-dessus. */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg);
}

::-webkit-scrollbar-thumb {
  border: 2px solid var(--color-bg);
  border-radius: 999px;
  background: var(--color-border);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}
```

- [ ] **Step 4 : build et vérification**

Run: `npm run build`, puis `npm run preview`. Dans Chrome :
1. En défilant, le header reste en haut, flou derrière, et la barre bleue avance jusqu'au bout en bas de page.
2. Le lien « Projets » du menu amène le titre de la section juste sous le header, pas dessous.
3. Grand écran : le portrait du hero reste visible sous le header pendant la transformation en réseau.
4. À 390 px de large : le header garde ses deux lignes et reste raisonnable en hauteur.
5. Sélectionner du texte : fond bleu, texte contrasté, dans les deux thèmes.
6. La barre de défilement est fine et suit le thème.
7. Après un changement de langue, les ancres tombent toujours juste (`--header-h` est reposé).

- [ ] **Step 5 : commit**

```bash
git add src/components/Header.astro src/components/HeroAscii.astro src/styles/base.css
git commit -m "feat: keep the header visible and theme selection and scrollbar

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5 : curseur point + anneau

**Files:**
- Create: `src/components/Cursor.astro`
- Modify: `src/layouts/Base.astro`

**Interfaces:**
- Produces: le composant `<Cursor />` (sans props), réutilisé par la 404 (Task 7).

- [ ] **Step 1 : le composant**

Create `src/components/Cursor.astro` :

```astro
---
// Point collé à la souris et anneau qui le suit. Le curseur natif n'est masqué
// qu'une fois le script lancé : sans JS, rien ne change.
---

<div class="cursor" aria-hidden="true" data-cursor transition:persist="cursor">
  <div class="ring"></div>
  <div class="dot"></div>
</div>

<style>
  .cursor {
    display: none;
  }

  :global(html.has-cursor) .cursor {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1000;
    pointer-events: none;
  }

  .ring,
  .dot {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    translate: -50% -50%;
    opacity: 0;
    transition: opacity var(--ease);
  }

  .dot {
    width: 6px;
    height: 6px;
    background: var(--color-accent);
  }

  .ring {
    width: 32px;
    height: 32px;
    border: 1.5px solid var(--color-accent);
    transition:
      opacity var(--ease),
      width var(--ease),
      height var(--ease),
      background-color var(--ease);
  }

  .cursor[data-visible] .ring,
  .cursor[data-visible] .dot {
    opacity: 1;
  }

  .cursor[data-hover] .ring {
    width: 48px;
    height: 48px;
    background: color-mix(in oklch, var(--color-accent) 15%, transparent);
  }

  /* !important : les boutons déclarent cursor: pointer avec une spécificité plus forte. */
  :global(html.has-cursor),
  :global(html.has-cursor *) {
    cursor: none !important;
  }

  :global(html.has-cursor :is(input, textarea, [contenteditable='true'])) {
    cursor: text !important;
  }
</style>

<script>
  const root = document.querySelector<HTMLElement>('[data-cursor]');

  if (root && matchMedia('(pointer: fine)').matches) {
    const dot = root.querySelector<HTMLElement>('.dot')!;
    const ring = root.querySelector<HTMLElement>('.ring')!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const CLICKABLE = 'a, button, [role="button"], summary, label, select';
    // Champs et iframes gardent leur propre curseur.
    const NATIVE = 'input, textarea, [contenteditable="true"], iframe';

    const html = document.documentElement;
    html.classList.add('has-cursor');
    // Le routeur remplace les attributs de <html> : la page suivante garde la classe.
    document.addEventListener('astro:before-swap', (event) => {
      event.newDocument.documentElement.classList.add('has-cursor');
    });

    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    // La boucle ne tourne que tant que l'anneau n'a pas rejoint le point.
    const render = () => {
      const follow = reduced.matches ? 1 : 0.2;
      ringX += (x - ringX) * follow;
      ringY += (y - ringY) * follow;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = Math.abs(x - ringX) + Math.abs(y - ringY) > 0.1 ? requestAnimationFrame(render) : 0;
    };

    addEventListener(
      'pointermove',
      (event) => {
        if (event.pointerType !== 'mouse') return;
        const target = event.target as Element;
        if (target.closest?.(NATIVE)) {
          root.removeAttribute('data-visible');
          return;
        }
        if (!root.hasAttribute('data-visible')) {
          ringX = event.clientX;
          ringY = event.clientY;
          root.setAttribute('data-visible', '');
        }
        x = event.clientX;
        y = event.clientY;
        root.toggleAttribute('data-hover', !!target.closest?.(CLICKABLE));
        if (!frame) frame = requestAnimationFrame(render);
      },
      { passive: true },
    );

    // L'iframe capte la souris : le parent ne reçoit plus que l'entrée sur l'iframe.
    addEventListener('pointerover', (event) => {
      if ((event.target as Element).closest?.(NATIVE)) root.removeAttribute('data-visible');
    });
    html.addEventListener('pointerleave', () => root.removeAttribute('data-visible'));
  }
</script>
```

- [ ] **Step 2 : l'inclure dans la mise en page**

Dans `src/layouts/Base.astro`, ajouter `import Cursor from '../components/Cursor.astro';` avec les autres imports de composants, et `<Cursor />` après `<Chatbot lang={lang} />`.

- [ ] **Step 3 : build et vérification**

Run: `npm run build`, puis `npm run preview`. Dans Chrome :
1. À la souris : point bleu collé, anneau qui suit avec un léger retard, plus de flèche native.
2. Sur un lien ou un bouton : l'anneau grossit et se remplit légèrement.
3. Le chatbot ouvert : au survol de son iframe, le curseur personnalisé disparaît et le curseur de l'iframe prend le relais.
4. La souris sort de la fenêtre : le curseur disparaît, puis revient à l'entrée.
5. Après un changement de langue : le curseur reste actif (pas de flèche native qui revient).
6. Mouvement réduit émulé : l'anneau suit sans retard.
7. DevTools en mode appareil tactile (`pointer: coarse`, à recharger) : aucun curseur personnalisé.

- [ ] **Step 4 : commit**

```bash
git add src/components/Cursor.astro src/layouts/Base.astro
git commit -m "feat: add a dot and ring cursor for mouse users

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6 : moteur des requins copié, traversée unique (TDD)

**Files:**
- Create: `src/lib/ocean/LICENSE`, `src/lib/ocean/math.ts`, `src/lib/ocean/species.ts`, `src/lib/ocean/world.ts`, `src/lib/ocean/renderer.ts`, `src/lib/ocean/engine.ts`, `src/lib/ocean/index.ts`
- Create: `src/lib/ocean/world.test.ts`

**Interfaces:**
- Produces, dans `world.ts` : `interface Crossing { dir: 1 | -1; duration: number }`, `interface WorldOptions { fishCount?: number; crossing?: Crossing }`, `new World(sharkSpecs?: SharkSpec[], options?: WorldOptions)` et le getter `World.done: boolean`.
- La Task 7 consomme `World`, `Crossing` et `SharkSpec`.

- [ ] **Step 1 : copier le code à un commit fixe**

Run :

```bash
mkdir -p src/lib/ocean
REF=a0074c16a106f0abc665fe9712ca445f8f98ad8e
for f in LICENSE src/math.ts src/species.ts src/world.ts src/renderer.ts src/engine.ts src/index.ts; do
  gh api "repos/stackedlol/ascii-sharks/contents/$f?ref=$REF" --jq .content | base64 -d > "src/lib/ocean/$(basename "$f")"
done
ls src/lib/ocean
```

Expected : `LICENSE engine.ts index.ts math.ts renderer.ts species.ts world.ts`.

- [ ] **Step 2 : mention d'origine et imports en `.ts`**

En tête de chacun des six fichiers `.ts`, ajouter :

```ts
// Copied from ascii-sharks (https://github.com/stackedlol/ascii-sharks, commit a0074c1),
// © 2026 drewdi, MIT licence: see LICENSE in this folder. Changes are marked "Adaptation:".
```

Ajouter l'extension `.ts` aux imports relatifs, pour que Node puisse lancer les tests (Vite accepte les deux formes) :

```bash
sed -i -E 's#from "\./(math|species|world|renderer|engine)"#from "./\1.ts"#' src/lib/ocean/*.ts
grep -n 'from "\./' src/lib/ocean/*.ts
```

Expected : chaque import relatif se termine par `.ts"`.

- [ ] **Step 3 : écrire les tests qui échouent**

Create `src/lib/ocean/world.test.ts` :

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { World } from './world.ts';

const STEP = 1 / 60;

test('sans traversée, le monde n’est jamais terminé', () => {
  const world = new World(undefined, { fishCount: 20 });
  world.resize(1200, 800, 10, 15);
  for (let t = 0; t < 5; t += STEP) world.step(STEP);
  assert.equal(world.fish.length, 20);
  assert.equal(world.done, false);
});

for (const dir of [1, -1] as const) {
  test(`un requin seul traverse l’écran dans le sens ${dir}`, () => {
    const world = new World([{ kind: 'classic', size: 1 }], { fishCount: 0, crossing: { dir, duration: 10 } });
    world.resize(1400, 300, 11, 16);
    assert.equal(world.fish.length, 0);
    assert.equal(world.sharks.length, 1);
    const shark = world.sharks[0];
    // Départ entièrement hors de l'écran, du côté d'entrée.
    for (let k = 0; k < shark.nodes.length; k += 2) {
      assert.ok(dir === 1 ? shark.nodes[k] <= 0 : shark.nodes[k] >= 1400);
    }

    let t = 0;
    let minY = Infinity;
    let maxY = -Infinity;
    while (t < 30 && !world.done) {
      world.step(STEP);
      t += STEP;
      minY = Math.min(minY, shark.nodes[1]);
      maxY = Math.max(maxY, shark.nodes[1]);
    }

    assert.equal(world.done, true);
    assert.ok(t > 7 && t < 14, `traversée en ${t.toFixed(1)} s`);
    assert.ok(minY > 0 && maxY < 300, `tête entre ${minY.toFixed(0)} et ${maxY.toFixed(0)}`);
  });
}

test('un redimensionnement ne relance pas la traversée', () => {
  const world = new World([{ kind: 'classic', size: 1 }], { fishCount: 0, crossing: { dir: 1, duration: 10 } });
  world.resize(1400, 300, 11, 16);
  for (let t = 0; t < 3; t += STEP) world.step(STEP);
  const head = world.sharks[0].nodes[0];
  world.resize(1400, 310, 11, 16);
  assert.equal(world.sharks[0].nodes[0], head);
});
```

- [ ] **Step 4 : vérifier l'échec**

Run: `npm test`
Expected : FAIL. Le constructeur d'origine utilise des propriétés de paramètre (`private sharkSpecs`), que Node refuse en mode « strip types » (`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`). Et `done` n'existe pas.

- [ ] **Step 5 : options, traversée et `done` dans `world.ts`**

Dans `src/lib/ocean/world.ts`, ajouter après `export type SharkSpec = { kind: SharkKind; size: number };` :

```ts
/** Adaptation: a single pass across the canvas, then the world reports done. */
export interface Crossing {
  dir: 1 | -1;
  /** Seconds from entering one edge to clearing the other. */
  duration: number;
}

export interface WorldOptions {
  /** Overrides the area-based population; 0 leaves the sharks alone. */
  fishCount?: number;
  crossing?: Crossing;
}
```

Remplacer le constructeur :

```ts
  /** fishCount overrides the area-based population (the sidebar wants a single small school). */
  constructor(
    private sharkSpecs: SharkSpec[] = DEFAULT_SHARKS,
    private fishCount?: number,
  ) {}
```

par :

```ts
  private sharkSpecs: SharkSpec[];
  private fishCount?: number;
  private crossing?: Crossing;

  // Adaptation: options object, and plain fields so Node can run the tests without a build.
  constructor(sharkSpecs: SharkSpec[] = DEFAULT_SHARKS, options: WorldOptions = {}) {
    this.sharkSpecs = sharkSpecs;
    this.fishCount = options.fishCount;
    this.crossing = options.crossing;
  }

  /** Adaptation: true once a crossing shark has fully left the canvas. */
  get done() {
    const crossing = this.crossing;
    if (!crossing || this.sharks.length === 0) return false;
    return this.sharks.every((sh) => {
      for (let k = 0; k < SHARK_NODES; k++) {
        const x = sh.nodes[k * 2];
        if (crossing.dir === 1 ? x < this.width + 10 : x > -10) return false;
      }
      return true;
    });
  }
```

Dans `resize()`, remplacer :

```ts
    if (first || this.fish.length === 0) {
```

par :

```ts
    // Adaptation: with no fish at all, a resize must not reseed (it would restart a crossing).
    if (first || this.sharks.length === 0) {
```

Dans `seed()`, remplacer le corps de la boucle des requins, de `const { kind, size } = this.sharkSpecs[i];` jusqu'au `this.sharks.push({ ... });` inclus, par :

```ts
      const { kind, size } = this.sharkSpecs[i];
      const length = baseLength * size;
      const orbitRadius = minSide * rand(0.28, 0.4);
      const a = (i / sharkCount) * TAU + rand(-0.4, 0.4);
      const orbitDir: 1 | -1 = i % 2 === 0 ? 1 : -1;
      let x = W / 2 + Math.cos(a) * orbitRadius * (W / minSide) * 0.9;
      let y = H / 2 + Math.sin(a) * orbitRadius;
      let heading = a + (orbitDir * Math.PI) / 2;
      let speed = 30;
      if (this.crossing) {
        // Adaptation: start just off the entry edge, level, already at crossing speed.
        const { dir, duration } = this.crossing;
        x = dir === 1 ? -10 : W + 10;
        y = H * rand(0.4, 0.6);
        heading = dir === 1 ? 0 : Math.PI;
        speed = (W + 2 * length) / duration;
      }
      const nodes = new Float32Array(SHARK_NODES * 2);
      const seg = length / (SHARK_NODES - 1);
      for (let n = 0; n < SHARK_NODES; n++) {
        nodes[n * 2] = x - Math.cos(heading) * seg * n;
        nodes[n * 2 + 1] = y - Math.sin(heading) * seg * n;
      }
      this.sharks.push({
        id: i + 1,
        kind,
        length,
        nodes,
        heading,
        speed,
        phase: rand(0, TAU),
        turn: 0,
        hunger: rand(0.25, 0.75),
        wander: 0,
        orbitDir,
        orbitRadius,
        target: null,
        retargetAt: 0,
        depth: size,
      });
```

Dans `stepSharks()`, remplacer le bloc qui va de `// Hunt.` jusqu'à la fermeture du bloc `// Turn back once the snout leaves the frame` inclus (c'est-à-dire jusqu'à la ligne `}` qui précède `const desired = Math.atan2(dy, dx);`) par :

```ts
      let hunting = false;
      let closing = 0;
      if (this.crossing) {
        // Adaptation: no hunting, patrol or turning back; swim across and stay mid-height.
        dx += this.crossing.dir * 2.5;
        dy += clamp((cyW - hy) / cyW, -1, 1) * 0.8;
      } else {
        // Hunt.
        if (time >= sh.retargetAt) {
          sh.target = this.findPrey(sh);
          sh.retargetAt = time + 0.45;
        }
        const t = sh.target;
        if (t && t.alive && sh.hunger > 0.3) {
          // Pursuit: aim at where the fish is about to be.
          const tx = t.x + t.vx * 0.35 - hx;
          const ty = t.y + t.vy * 0.35 - hy;
          const d = Math.hypot(tx, ty) || 1;
          const w = 1.4 + 2.6 * sh.hunger;
          dx += (tx / d) * w;
          dy += (ty / d) * w;
          hunting = true;
          closing = clamp(1 - d / (L * 0.9), 0, 1);
        } else {
          // Patrol: a lazy circuit around the headline.
          const rx = (hx - cxW) / (W / minSide);
          const ry = hy - cyW;
          const r = Math.hypot(rx, ry) || 1;
          const radius = sh.orbitRadius * (1 + 0.15 * Math.sin(time * 0.05 + sh.id));
          const radial = clamp((radius - r) / radius, -1, 1);
          dx += ((-ry / r) * sh.orbitDir + (rx / r) * radial * 0.9) * 0.55;
          dy += ((rx / r) * sh.orbitDir + (ry / r) * radial * 0.9) * 0.55;
        }

        // Give other sharks room.
        for (const other of sharks) {
          if (other === sh) continue;
          for (let k = 0; k < SHARK_NODES; k += 4) {
            const ox = hx - other.nodes[k * 2];
            const oy = hy - other.nodes[k * 2 + 1];
            const d = Math.hypot(ox, oy);
            const range = (L + other.length) * 0.45;
            if (d < range && d > 1e-3) {
              const w = (1 - d / range) * 3;
              dx += (ox / d) * w;
              dy += (oy / d) * w;
            }
          }
        }

        // Keep the headline mostly clear: a soft elliptical no-swim zone.
        const ex = (hx - cxW) / (W * 0.3);
        const ey = (hy - cyW) / (H * 0.16);
        const e2 = ex * ex + ey * ey;
        if (e2 < 1) {
          const e = Math.sqrt(e2) || 1e-3;
          const w = (1 - e) * (hunting ? 1 : 2.5);
          dx += (ex / e) * w;
          dy += (ey / e) * w;
        }

        // Turn back once the snout leaves the frame, so bodies dip off-screen
        // now and then but the sharks never wander away for good.
        const over = Math.max(-hx, hx - W, -hy, hy - H);
        if (over > -L * 0.05) {
          const w = clamp((over + L * 0.05) / (L * 0.35), 0, 1) * 3.5;
          const toX = cxW - hx;
          const toY = cyW - hy;
          const d = Math.hypot(toX, toY) || 1;
          dx += (toX / d) * w;
          dy += (toY / d) * w;
        }
      }
```

Toujours dans `stepSharks()`, remplacer :

```ts
      const targetSpeed = hunting ? cruise * (1.45 + closing * 1.5) : cruise;
```

par :

```ts
      // Adaptation: a crossing keeps the speed that fits its duration.
      const targetSpeed = this.crossing
        ? (W + 2 * L) / this.crossing.duration
        : hunting
          ? cruise * (1.45 + closing * 1.5)
          : cruise;
```

- [ ] **Step 6 : vérifier le succès**

Run: `npm test`
Expected : PASS (4 tests de `rich`, 4 de `world`). Si la durée sort de 7 à 14 s ou si la tête quitte la bande, ajuster seulement les poids `2.5` et `0.8` du bloc `if (this.crossing)` et relancer.

- [ ] **Step 7 : commit**

```bash
git add src/lib/ocean
git commit -m "feat: vendor ascii-sharks and add a single crossing mode

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7 : options de rendu et page 404

**Files:**
- Modify: `src/lib/ocean/renderer.ts`
- Modify: `src/lib/ocean/engine.ts`
- Modify: `src/lib/ocean/index.ts`
- Modify: `src/pages/404.astro`

**Interfaces:**
- Consumes: `World`, `Crossing`, `SharkSpec` (Task 6) et `<Cursor />` (Task 5).
- Produces : `new OceanEngine(canvas: HTMLCanvasElement, sharks?: SharkSpec[], options?: OceanOptions)`, avec `OceanOptions { transparent?, accents?, bubble?, fishCount?, crossing?, interactive?, onDone? }`, et `OceanEngine.destroy()`. La Task 8 l'utilise.

- [ ] **Step 1 : renderer, fond transparent, couleurs et bulles**

Dans `src/lib/ocean/renderer.ts` :

Ajouter après la ligne `const ACCENTS = [...]` :

```ts
/** Adaptation: bubbles replace the red splash where a fish is eaten. */
const BUBBLE = "rgb(110,230,255)";

export interface RendererOptions {
  /** Adaptation: no black fill nor grid, for drawing over a page. */
  transparent?: boolean;
  accents?: string[];
  bubble?: string;
}
```

Dans la classe, ajouter après `private fontFamily = "ui-monospace, Menlo, monospace";` :

```ts
  private transparent: boolean;
  private accents: string[];
  private bubble: string;
```

Remplacer le début du constructeur :

```ts
  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d", { alpha: false });
```

par :

```ts
  constructor(private canvas: HTMLCanvasElement, options: RendererOptions = {}) {
    this.transparent = options.transparent ?? false;
    this.accents = options.accents ?? ACCENTS;
    this.bubble = options.bubble ?? BUBBLE;
    const ctx = canvas.getContext("2d", { alpha: this.transparent });
```

Ajouter après le getter `cellHeight` :

```ts
  /** Adaptation: wipe the canvas once a crossing is over. */
  clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
```

Dans `paintBackground()`, ajouter en première ligne :

```ts
    if (this.transparent) return;
```

Dans `render()`, remplacer :

```ts
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(this.bg, 0, 0);
```

par :

```ts
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (this.transparent) ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    else ctx.drawImage(this.bg, 0, 0);
```

Remplacer les deux occurrences de `ACCENTS[key % ACCENTS.length]` (dans `drawSharks`) par `this.accents[key % this.accents.length]`.

Remplacer toute la méthode `drawHeat()` par :

```ts
  /** Adaptation: bubbles in one colour where a fish was eaten, instead of red splashes. */
  private drawHeat() {
    const { ctx, heat, cols, cw, ch } = this;
    ctx.fillStyle = this.bubble;
    for (let i = 0; i < heat.length; i++) {
      const h = heat[i];
      if (h < 0.08) continue;
      ctx.globalAlpha = Math.min(1, h * 1.4);
      const col = i % cols;
      const row = (i / cols) | 0;
      ctx.fillText(h > 0.6 ? "o" : "°", col * cw + cw / 2, row * ch + ch / 2 + 1);
    }
    ctx.globalAlpha = 1;
  }
```

Vérifier : `grep -n "220,40,40\|255,120,60" src/lib/ocean/renderer.ts` ne renvoie rien.

- [ ] **Step 2 : moteur, options et fin de traversée**

Remplacer tout `src/lib/ocean/engine.ts` par :

```ts
// Copied from ascii-sharks (https://github.com/stackedlol/ascii-sharks, commit a0074c1),
// © 2026 drewdi, MIT licence: see LICENSE in this folder. Changes are marked "Adaptation:".
import { AsciiRenderer, type RendererOptions } from "./renderer.ts";
import { World, type Crossing, type SharkSpec } from "./world.ts";

const STEP = 1 / 60;
const MAX_STEPS = 4;

export interface OceanOptions extends RendererOptions {
  /** Overrides the area-based fish population; 0 leaves the sharks alone. */
  fishCount?: number;
  /** Adaptation: one pass across the canvas, then onDone. */
  crossing?: Crossing;
  /** Adaptation: false ignores the pointer (fish don't flee, clicks don't splash). */
  interactive?: boolean;
  onDone?: () => void;
}

/**
 * Wires World + AsciiRenderer to a canvas: fixed-timestep loop, resize,
 * pointer input, pausing off-screen, and prefers-reduced-motion.
 */
export class OceanEngine {
  private world: World;
  private renderer: AsciiRenderer;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private visible = true;
  private reducedMotion: MediaQueryList;
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;
  private disposed = false;
  private canvas: HTMLCanvasElement;
  private options: OceanOptions;

  constructor(canvas: HTMLCanvasElement, sharks?: SharkSpec[], options: OceanOptions = {}) {
    this.canvas = canvas;
    this.options = options;
    this.world = new World(sharks, { fishCount: options.fishCount, crossing: options.crossing });
    this.renderer = new AsciiRenderer(canvas, options);
    this.renderer.setFontFamily(getComputedStyle(canvas).fontFamily);
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.schedule();
    });
    this.intersectionObserver.observe(canvas);

    this.reducedMotion.addEventListener("change", this.onMotionPreference);
    if (options.interactive ?? true) {
      window.addEventListener("pointermove", this.onPointerMove, { passive: true });
      window.addEventListener("pointerdown", this.onPointerDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", this.onPointerLeave);
      window.addEventListener("blur", this.onPointerLeave);
    }

    this.resize();
    // Canvas text can't trigger a webfont load; once the mono face is in, redraw.
    document.fonts?.load(`600 16px ${getComputedStyle(canvas).fontFamily}`).then(() => {
      if (!this.disposed && this.reducedMotion.matches) this.drawStill();
    });
    this.schedule();
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.reducedMotion.removeEventListener("change", this.onMotionPreference);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerdown", this.onPointerDown);
    document.documentElement.removeEventListener("pointerleave", this.onPointerLeave);
    window.removeEventListener("blur", this.onPointerLeave);
  }

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.resize(rect.width, rect.height, dpr);
    this.world.resize(rect.width, rect.height, this.renderer.cellWidth, this.renderer.cellHeight);
    if (this.reducedMotion.matches) this.drawStill();
  }

  private schedule() {
    cancelAnimationFrame(this.raf);
    if (this.disposed || !this.visible || this.reducedMotion.matches) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    this.acc += dt;
    let steps = 0;
    while (this.acc >= STEP && steps < MAX_STEPS) {
      this.world.step(STEP);
      this.acc -= STEP;
      steps++;
    }
    if (steps === MAX_STEPS) this.acc = 0;
    // Adaptation: a finished crossing stops the loop and hands over to the caller.
    if (this.world.done) {
      this.raf = 0;
      this.renderer.clear();
      this.options.onDone?.();
      return;
    }
    this.renderer.render(this.world, dt);
    this.raf = requestAnimationFrame(this.frame);
  };

  /** Reduced motion: let the ecosystem settle, then show a single frame. */
  private drawStill() {
    if (this.world.time < 4) {
      for (let i = 0; i < 240; i++) this.world.step(STEP);
    }
    this.renderer.render(this.world, STEP);
  }

  private onMotionPreference = () => {
    if (this.reducedMotion.matches) {
      cancelAnimationFrame(this.raf);
      this.drawStill();
    } else {
      this.schedule();
    }
  };

  private toLocal(e: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    return { x, y, inside };
  }

  private onPointerMove = (e: PointerEvent) => {
    const { x, y, inside } = this.toLocal(e);
    const p = this.world.pointer;
    p.x = x;
    p.y = y;
    p.active = inside && e.pointerType !== "touch";
  };

  private onPointerDown = (e: PointerEvent) => {
    const { x, y, inside } = this.toLocal(e);
    if (inside && !this.reducedMotion.matches) this.world.splash(x, y);
  };

  private onPointerLeave = () => {
    this.world.pointer.active = false;
  };
}
```

Remplacer `src/lib/ocean/index.ts` par :

```ts
// Copied from ascii-sharks (https://github.com/stackedlol/ascii-sharks, commit a0074c1),
// © 2026 drewdi, MIT licence: see LICENSE in this folder. Changes are marked "Adaptation:".
export { OceanEngine, type OceanOptions } from "./engine.ts";
export { AsciiRenderer, paintGrid } from "./renderer.ts";
export { World, type Crossing, type SharkKind, type SharkSpec } from "./world.ts";
```

Run: `npm test`
Expected : PASS. Les tests ne touchent pas le moteur, mais `world.ts` doit toujours se charger.

- [ ] **Step 3 : page 404**

Remplacer tout `src/pages/404.astro` par :

```astro
---
import '@fontsource-variable/ibm-plex-sans/wght.css';
import '@fontsource/ibm-plex-mono/400.css';
import '../styles/tokens.css';
import '../styles/base.css';
import Cursor from '../components/Cursor.astro';
import { langs } from '../i18n/ui';

const copy = {
  fr: { text: 'Cette page n’existe pas ou a été déplacée.', back: 'Retour à l’accueil' },
  en: { text: 'This page does not exist or has moved.', back: 'Back to home' },
};
---

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>404 | Sefer Tasdemir</title>
    <link rel="icon" href="/assets/img/logo.webp" type="image/webp" />
    <script is:inline>
      (function () {
        // GitHub Pages sert cette page pour toute adresse inconnue : la langue se choisit ici.
        // Priorité : l'adresse demandée, puis le choix enregistré, puis le navigateur.
        var lang = null;
        var match = /^\/(fr|en)(\/|$)/.exec(location.pathname);
        if (match) lang = match[1];
        if (!lang) {
          try {
            lang = localStorage.getItem('preferredLanguage');
          } catch (e) {}
        }
        if (lang !== 'fr' && lang !== 'en') {
          lang = (navigator.language || '').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
        }
        document.documentElement.lang = lang;
        document.documentElement.dataset.lang = lang;
      })();
    </script>
  </head>
  <body>
    <canvas class="ocean" aria-hidden="true" data-ocean></canvas>
    <main class="card">
      <h1>404</h1>
      {
        langs.map((code) => (
          <div class="copy" lang={code}>
            <p>{copy[code].text}</p>
            <a href={`/${code}/`}>{copy[code].back}</a>
          </div>
        ))
      }
      <ul class="switch" aria-label="Langue / Language">
        {
          langs.map((code) => (
            <li>
              <button type="button" lang={code} data-set-lang={code} aria-pressed="false">
                {code.toUpperCase()}
              </button>
            </li>
          ))
        }
      </ul>
    </main>
    <Cursor />
  </body>
</html>

<style>
  /* L'océan est une scène sombre, quel que soit le thème choisi ailleurs. */
  :global(body) {
    color-scheme: dark;
    display: grid;
    place-items: center;
    min-height: 100svh;
    overflow: hidden;
    background: #000;
  }

  .ocean {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    color: var(--color-accent);
    font-family: var(--font-mono);
  }

  .card {
    position: relative;
    display: grid;
    gap: var(--space-s);
    justify-items: start;
    width: min(100% - 2 * var(--space-m), 30rem);
    padding: var(--space-l);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: oklch(0.12 0.03 265 / 0.78);
    color: var(--color-on-scrim);
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
  }

  h1 {
    font-size: var(--step-4);
  }

  .copy p {
    margin: 0 0 var(--space-xs);
  }

  /* Sans JS, le français s'affiche ; sinon, la langue choisie par le script. */
  .copy {
    display: none;
  }

  :global(html:not([data-lang])) .copy[lang='fr'],
  :global(html[data-lang='fr']) .copy[lang='fr'],
  :global(html[data-lang='en']) .copy[lang='en'] {
    display: block;
  }

  .switch {
    display: none;
    gap: 0.25rem;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--font-mono);
    font-size: var(--step--1);
  }

  :global(html[data-lang]) .switch {
    display: flex;
  }

  .switch button {
    padding: 0.35rem 0.5rem;
    border: 0;
    border-radius: var(--radius);
    background: none;
    color: var(--color-muted);
    font: inherit;
    cursor: pointer;
  }

  .switch button:hover,
  .switch button[aria-pressed='true'] {
    color: var(--color-on-scrim);
  }

  .switch button[aria-pressed='true'] {
    font-weight: 600;
  }
</style>

<script>
  import { OceanEngine } from '../lib/ocean';

  const root = document.documentElement;
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-set-lang]')];
  const sync = () =>
    buttons.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.setLang === root.dataset.lang)),
    );

  // Bascule sur place : la 404 n'a pas d'adresse par langue.
  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      const lang = button.dataset.setLang ?? 'fr';
      root.dataset.lang = lang;
      root.lang = lang;
      try {
        localStorage.setItem('preferredLanguage', lang);
      } catch {}
      sync();
    }),
  );
  sync();

  const canvas = document.querySelector<HTMLCanvasElement>('[data-ocean]');
  if (canvas) new OceanEngine(canvas, undefined, { bubble: getComputedStyle(canvas).color });
</script>
```

- [ ] **Step 4 : build et vérification**

Run: `npm run build && ls dist/404.html`, puis `npm run preview`. Dans Chrome :
1. `http://localhost:4321/page-inconnue` : océan plein écran, requins et bancs de poissons, carte « 404 » lisible au centre, texte dans la langue enregistrée ou du navigateur.
2. `http://localhost:4321/en/page-inconnue` : anglais. `/fr/page-inconnue` : français.
3. Le sélecteur FR/EN bascule le texte sans recharger, et le lien de retour change avec lui (`/fr/` ou `/en/`).
4. Les poissons fuient la souris et un clic fait une onde. Quand un requin mange, on voit des bulles bleues et aucune tache rouge.
5. Thème clair choisi sur le site : la 404 reste sombre et lisible.
6. Mouvement réduit émulé, puis rechargement : image fixe de l'océan.
7. Aucune erreur dans la console.

- [ ] **Step 5 : commit**

```bash
git add src/lib/ocean src/pages/404.astro
git commit -m "feat: show an ASCII ocean on the 404 page in one language

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8 : requin qui traverse l'accueil

**Files:**
- Create: `src/components/SharkPass.astro`
- Modify: `src/pages/[lang]/index.astro`

**Interfaces:**
- Consumes: `onPage` (Task 3) et `OceanEngine` avec `OceanOptions` (Task 7).

- [ ] **Step 1 : le composant**

Create `src/components/SharkPass.astro` :

```astro
---
// Easter egg : de temps en temps, un requin ASCII traverse le bas de l'accueil, derrière le contenu.
---

<canvas class="shark-pass" aria-hidden="true" data-shark-pass></canvas>

<style>
  .shark-pass {
    position: fixed;
    inset-inline: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    height: 35vh;
    opacity: 0.35;
    pointer-events: none;
    color: var(--color-accent);
    font-family: var(--font-mono);
  }
</style>

<script>
  import { onPage } from '../lib/lifecycle';
  import { OceanEngine } from '../lib/ocean';

  const between = (min: number, max: number) => (min + Math.random() * (max - min)) * 1000;

  onPage(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('[data-shark-pass]');
    if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = 0;
    let engine: OceanEngine | null = null;

    const later = (min: number, max: number) => {
      timer = window.setTimeout(pass, between(min, max));
    };

    // Le moteur n'existe que le temps d'une traversée : rien ne tourne entre deux passages.
    const pass = () => {
      if (document.hidden) return later(60, 120);
      engine = new OceanEngine(canvas, [{ kind: 'classic', size: 1 }], {
        transparent: true,
        interactive: false,
        fishCount: 0,
        // Reflets à la couleur d'accent, relue à chaque passage pour suivre le thème.
        accents: [getComputedStyle(canvas).color],
        crossing: { dir: Math.random() < 0.5 ? 1 : -1, duration: 8 + Math.random() * 4 },
        onDone: () => {
          engine?.destroy();
          engine = null;
          later(60, 120);
        },
      });
    };

    later(20, 40);

    return () => {
      clearTimeout(timer);
      engine?.destroy();
      engine = null;
    };
  });
</script>
```

- [ ] **Step 2 : l'inclure sur l'accueil**

Dans `src/pages/[lang]/index.astro`, ajouter `import SharkPass from '../../components/SharkPass.astro';` avec les autres imports, et `<SharkPass />` après `<HomeSections lang={lang} />`.

- [ ] **Step 3 : build et vérification**

Pour ne pas attendre 20 à 40 s, raccourcir temporairement `later(20, 40)` en `later(1, 2)` et `later(60, 120)` (dans `onDone`) en `later(3, 4)`. Ne pas commiter ces valeurs.

Run: `npm run build`, puis `npm run preview`. Dans Chrome, sur `/fr/` :
1. Un requin gris aux reflets bleus traverse le bas de l'écran en 8 à 12 s, dans un sens puis dans l'autre selon le tirage, derrière le texte et à faible opacité.
2. Les clics sur les liens en bas de page marchent pendant le passage.
3. Entre deux passages, l'onglet Performance de DevTools ne montre pas de boucle `requestAnimationFrame`.
4. Thème clair : le requin reste discret et lisible.
5. Ouvrir une fiche projet pendant un passage : le requin disparaît, pas d'erreur dans la console. Revenir à l'accueil : les passages reprennent.
6. Onglet en arrière-plan : pas de passage tant qu'il est caché.
7. Mouvement réduit émulé, puis rechargement : jamais de requin.

Remettre `later(20, 40)` et `later(60, 120)`, puis `git diff src/components/SharkPass.astro` pour confirmer les valeurs finales.

- [ ] **Step 4 : commit**

```bash
git add src/components/SharkPass.astro "src/pages/[lang]/index.astro"
git commit -m "feat: send an ASCII shark across the home page now and then

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9 : vérification finale

**Files:** aucun, sauf correctifs.

- [ ] **Step 1 : tests et build complets**

Run: `npm test && npm run build`
Expected : tous les tests passent et le build réussit.

- [ ] **Step 2 : parcours complet dans Chrome**

Avec `npm run preview`, refaire la liste « Vérification » de la spec (`docs/superpowers/specs/2026-11-02-site-polish-design.md`), en grand écran puis à 390 px de large, en thème sombre puis clair. Noter chaque point vérifié et chaque écart.

- [ ] **Step 3 : relire le diff**

Run: `git diff origin/main --stat` et `git log --oneline origin/main..HEAD`
Expected : seulement les fichiers listés dans ce plan, plus la spec et le plan.

- [ ] **Step 4 : rendre compte à Sefer**

Résumer ce qui marche, ce qui a été vérifié et ce qui ne l'a pas été. Demander s'il faut pousser la branche et ouvrir la PR. Ne rien pousser sans son accord.
