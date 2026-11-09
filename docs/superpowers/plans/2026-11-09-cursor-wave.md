# Effet de vague sur le curseur : plan d'implémentation

> **Dépassé.** Ce plan décrit l'essai des trois modes. Seul `ripple` a été gardé, les autres modes, `warp` dans le renderer et `?wave=` ont été retirés : voir la spec pour l'état final.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** appliquer la spec `docs/superpowers/specs/2026-11-09-cursor-wave-design.md` : trois effets de vague pour le curseur (`ripple`, `snake`, `warp`), sélectionnables par `?wave=`, à comparer puis à réduire à un seul.

**Architecture:** les formules (rayon et opacité d'une ondulation, décalage d'un caractère, décalage d'un glyphe de l'océan) et la résolution du mode vivent dans un module pur `src/lib/wave.ts`, testé avec `node --test`. `Cursor.astro` dessine `ripple` et `snake` sur son canvas existant. `warp` est dessiné par `AsciiRenderer` (océan), activé par l'option `warp`.

**Tech Stack:** Astro 7, TypeScript, canvas 2D, `node --test` (`npm test`).

## Global Constraints

- Imports sans extension dans les scripts Astro (`'../lib/wave'`), avec extension `.ts` dans `src/lib/**` (convention existante).
- Commentaires et textes en français, comme le reste du dépôt.
- `prefers-reduced-motion: reduce` : aucun effet.
- Aucune dépendance ajoutée, aucun nouveau composant.
- Aucun commit tant que l'utilisateur ne le demande pas : les étapes se terminent par la vérification, pas par un commit.
- Mode par défaut pendant l'essai : `ripple`. Valeur inconnue : défaut.

## Structure des fichiers

- Créer `src/lib/wave.ts` : types et formules pures, résolution du mode (+ lecture navigateur).
- Créer `src/lib/wave.test.ts` : tests des formules et de la résolution.
- Modifier `src/components/Cursor.astro` (script) : modes `ripple` et `snake`.
- Modifier `src/lib/ocean/renderer.ts` : option `warp`, décalage des glyphes, dépôt d'énergie renforcé.
- Modifier `src/components/ReefSchool.astro` et `src/pages/404.astro` : passer `warp`. `SharkPass.astro` est exclu : son océan est `interactive: false`, le pointeur n'y est jamais actif.

---

### Task 1: Module `wave.ts` (formules et mode)

**Files:**
- Create: `src/lib/wave.ts`
- Test: `src/lib/wave.test.ts`

**Interfaces:**
- Produces:
  - `type WaveMode = 'ripple' | 'snake' | 'warp' | 'bubbles'`
  - `DEFAULT_WAVE: WaveMode`
  - `resolveWaveMode(search: string, stored: string | null): WaveMode`
  - `currentWaveMode(): WaveMode` (navigateur)
  - `rippleAt(age: number, maxRadius: number): { radius: number; alpha: number; width: number }`
  - `snakeOffset(distance: number, age: number, amplitude: number, wavelength: number): number`
  - `warpOffset(dist: number, time: number, p: WarpParams): number`
  - `SNAKE: { amplitude: number; wavelength: number }`, `WARP: WarpParams`

- [ ] **Step 1: Écrire les tests**

Créer `src/lib/wave.test.ts` :

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DEFAULT_WAVE, resolveWaveMode, rippleAt, snakeOffset, warpOffset, WARP } from './wave.ts';

test('le paramètre ?wave= choisit le mode', () => {
  assert.equal(resolveWaveMode('?wave=snake', null), 'snake');
  assert.equal(resolveWaveMode('?x=1&wave=warp', null), 'warp');
  assert.equal(resolveWaveMode('?wave=bubbles', null), 'bubbles');
});

test('sans paramètre, le mode mémorisé sert, puis le défaut', () => {
  assert.equal(resolveWaveMode('', 'snake'), 'snake');
  assert.equal(resolveWaveMode('', null), DEFAULT_WAVE);
});

test('une valeur inconnue retombe sur le défaut', () => {
  assert.equal(resolveWaveMode('?wave=tsunami', null), DEFAULT_WAVE);
  assert.equal(resolveWaveMode('?wave=tsunami', 'nope'), DEFAULT_WAVE);
});

test('le paramètre l\'emporte sur le mode mémorisé', () => {
  assert.equal(resolveWaveMode('?wave=warp', 'snake'), 'warp');
});

test('une ondulation grandit et s\'efface', () => {
  const start = rippleAt(0, 40);
  const mid = rippleAt(0.5, 40);
  const end = rippleAt(1, 40);
  assert.equal(start.radius, 0);
  assert.ok(mid.radius > start.radius && end.radius > mid.radius);
  assert.equal(end.radius, 40);
  assert.ok(start.alpha > mid.alpha && mid.alpha > end.alpha);
  assert.equal(end.alpha, 0);
  assert.ok(start.width > end.width);
});

test('l\'âge d\'une ondulation est borné', () => {
  assert.deepEqual(rippleAt(-1, 40), rippleAt(0, 40));
  assert.deepEqual(rippleAt(5, 40), rippleAt(1, 40));
});

test('le décalage du serpent suit une sinusoïde qui s\'amortit', () => {
  const quarter = 90 / 4;
  assert.ok(Math.abs(snakeOffset(0, 0, 7, 90)) < 1e-9);
  assert.ok(Math.abs(snakeOffset(quarter, 0, 7, 90) - 7) < 1e-9);
  assert.ok(Math.abs(snakeOffset(quarter, 0.5, 7, 90) - 3.5) < 1e-9);
  assert.ok(Math.abs(snakeOffset(quarter, 1, 7, 90)) < 1e-9);
});

test('l\'onde du fond est nulle hors du rayon et bornée dedans', () => {
  assert.equal(warpOffset(WARP.radius, 1, WARP), 0);
  assert.equal(warpOffset(WARP.radius + 50, 1, WARP), 0);
  for (let d = 0; d < WARP.radius; d += 7) {
    for (let t = 0; t < 3; t += 0.37) {
      assert.ok(Math.abs(warpOffset(d, t, WARP)) <= WARP.amplitude + 1e-9);
    }
  }
});

test('l\'onde du fond se propage avec le temps', () => {
  const d = 30;
  assert.notEqual(warpOffset(d, 0, WARP), warpOffset(d, 0.2, WARP));
});
```

- [ ] **Step 2: Vérifier que les tests échouent**

Run: `npm test`
Expected: échec, `wave.ts` introuvable (`ERR_MODULE_NOT_FOUND`).

- [ ] **Step 3: Écrire l'implémentation**

Créer `src/lib/wave.ts` :

```ts
// Effets de vague du curseur : formules pures et choix du mode. Rien ici ne dessine.

export type WaveMode = 'ripple' | 'snake' | 'warp' | 'bubbles';

const MODES: readonly WaveMode[] = ['ripple', 'snake', 'warp', 'bubbles'];
export const DEFAULT_WAVE: WaveMode = 'ripple';

const isMode = (value: string | null): value is WaveMode => !!value && (MODES as readonly string[]).includes(value);

/** Le paramètre ?wave= l'emporte, puis le mode mémorisé pour la session, puis le défaut. */
export function resolveWaveMode(search: string, stored: string | null): WaveMode {
  const param = new URLSearchParams(search).get('wave');
  if (isMode(param)) return param;
  if (!param && isMode(stored)) return stored;
  return DEFAULT_WAVE;
}

/**
 * Mode actif dans le navigateur. Un paramètre valide est mémorisé pour la session : le
 * routeur retire ?wave= de l'adresse à la navigation, mais l'essai doit continuer.
 */
export function currentWaveMode(): WaveMode {
  let stored: string | null = null;
  try {
    stored = sessionStorage.getItem('wave');
  } catch {
    // Stockage indisponible : le paramètre seul fait foi.
  }
  const mode = resolveWaveMode(location.search, stored);
  if (new URLSearchParams(location.search).get('wave') === mode) {
    try {
      sessionStorage.setItem('wave', mode);
    } catch {
      // Sans stockage, le mode ne survit pas à la navigation : sans gravité.
    }
  }
  return mode;
}

/** Ondulation d'eau : rayon, opacité et épaisseur du trait selon l'âge (0 → 1). */
export function rippleAt(age: number, maxRadius: number) {
  const t = Math.min(1, Math.max(0, age));
  const eased = 1 - (1 - t) ** 2;
  return { radius: maxRadius * eased, alpha: (1 - t) ** 1.5 * 0.8, width: 0.6 + 1.8 * (1 - t) };
}

export const SNAKE = { amplitude: 7, wavelength: 90 };

/** Serpent : décalage perpendiculaire d'un caractère, selon la distance parcourue et l'âge. */
export function snakeOffset(distance: number, age: number, amplitude: number, wavelength: number) {
  return amplitude * (1 - Math.min(1, Math.max(0, age))) * Math.sin((distance / wavelength) * Math.PI * 2);
}

export interface WarpParams {
  /** Rayon d'effet autour du pointeur, en px. */
  radius: number;
  /** Décalage vertical maximal, en px. */
  amplitude: number;
  /** Distance entre deux crêtes, en px. */
  wavelength: number;
  /** Vitesse de propagation, en rad/s. */
  speed: number;
}

export const WARP: WarpParams = { radius: 160, amplitude: 5, wavelength: 48, speed: 7 };

/** Fond de l'océan : décalage vertical d'un glyphe à `dist` px du pointeur, à l'instant `time` (s). */
export function warpOffset(dist: number, time: number, p: WarpParams) {
  if (dist >= p.radius) return 0;
  const falloff = (1 - dist / p.radius) ** 2;
  return p.amplitude * falloff * Math.sin((dist / p.wavelength) * Math.PI * 2 - time * p.speed);
}
```

- [ ] **Step 4: Vérifier que les tests passent**

Run: `npm test`
Expected: tous les tests passent, y compris `label`, `world` et `rich`.

---

### Task 2: Modes `ripple` et `snake` dans `Cursor.astro`

**Files:**
- Modify: `src/components/Cursor.astro` (script, lignes 109-253)

**Interfaces:**
- Consumes: `currentWaveMode`, `rippleAt`, `snakeOffset`, `SNAKE` de `../lib/wave` (Task 1).

- [ ] **Step 1: Importer le module**

En tête du `<script>` (avant `const root = ...`, ligne 110), ajouter :

```ts
  import { currentWaveMode, rippleAt, SNAKE, snakeOffset } from '../lib/wave';

```

- [ ] **Step 2: Remplacer le bloc « Traînée » (de `// Traînée : une bulle tous les STEP px` jusqu'à la fin de `drawTrail`)**

Remplacer les lignes 127-197 actuelles par :

```ts
    // Traînée : un point tous les STEP px sur le trajet réel, pour que la trace reste continue
    // même à grande vitesse. Le mode (?wave=) décide de ce que devient ce point :
    // bulle qui monte (bubbles), cercle qui s'élargit (ripple), caractère qui serpente (snake).
    // warp ne dessine rien ici : l'onde est dans le fond de l'océan.
    const mode = currentWaveMode();
    const canvas = root.querySelector<HTMLCanvasElement>('.trail')!;
    const paint = canvas.getContext('2d')!;
    const STEP = 15;
    const RIPPLE_EVERY = 3;
    const MAX_BUBBLES = 120;
    const MAX_RIPPLES = 24;
    type Mote = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      born: number;
      life: number;
      size: number;
      // Présents pour le serpent seulement : normale au trajet et distance parcourue.
      nx?: number;
      ny?: number;
      travel?: number;
    };
    const bubbles: Mote[] = [];
    const ripples: { x: number; y: number; born: number; life: number; max: number }[] = [];
    let steps = 0;
    let trailX = NaN;
    let trailY = NaN;
    let color = '';
    let font = '';

    const fit = () => {
      const dpr = devicePixelRatio || 1;
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
      paint.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint.textAlign = 'center';
      paint.textBaseline = 'middle';
    };
    fit();
    addEventListener('resize', fit);

    const ripple = (rx: number, ry: number, max: number, life: number) => {
      ripples.push({ x: rx, y: ry, max, life, born: performance.now() });
    };

    const lay = (px: number, py: number) => {
      if (reduced.matches || mode === 'warp') return;
      if (Number.isNaN(trailX) || Math.hypot(px - trailX, py - trailY) > 300) {
        trailX = px;
        trailY = py;
        return;
      }
      let dist = Math.hypot(px - trailX, py - trailY);
      while (dist >= STEP) {
        const dirX = (px - trailX) / dist;
        const dirY = (py - trailY) / dist;
        trailX += dirX * STEP;
        trailY += dirY * STEP;
        dist = Math.hypot(px - trailX, py - trailY);
        steps++;
        if (mode === 'ripple') {
          if (steps % RIPPLE_EVERY === 0) ripple(trailX, trailY, 36, 900 + Math.random() * 200);
        } else if (mode === 'snake') {
          bubbles.push({
            x: trailX,
            y: trailY,
            vx: 0,
            vy: -0.1,
            born: performance.now(),
            life: 1100 + Math.random() * 300,
            size: 13,
            nx: -dirY,
            ny: dirX,
            travel: steps * STEP,
          });
        } else {
          bubbles.push({
            x: trailX + (Math.random() - 0.5) * 8,
            y: trailY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 0.2,
            vy: -(0.2 + Math.random() * 0.3),
            born: performance.now(),
            life: 850 + Math.random() * 250,
            size: 11 + Math.random() * 5,
          });
        }
      }
      if (bubbles.length > MAX_BUBBLES) bubbles.splice(0, bubbles.length - MAX_BUBBLES);
      if (ripples.length > MAX_RIPPLES) ripples.splice(0, ripples.length - MAX_RIPPLES);
    };

    const drawTrail = (now: number) => {
      paint.clearRect(0, 0, innerWidth, innerHeight);
      if (!bubbles.length && !ripples.length) return;
      // Couleur et police relues à chaque image : elles suivent le thème.
      color = getComputedStyle(dot).backgroundColor;
      font = getComputedStyle(document.body).getPropertyValue('--font-mono') || 'ui-monospace, monospace';
      paint.fillStyle = color;
      paint.strokeStyle = color;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const wave = ripples[i];
        const age = (now - wave.born) / wave.life;
        if (age >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        // Un anneau principal, et un second plus petit et plus pâle à l'intérieur.
        for (const [scale, fade] of [[1, 1], [0.6, 0.5]]) {
          const { radius, alpha, width } = rippleAt(age, wave.max * scale);
          paint.globalAlpha = alpha * fade;
          paint.lineWidth = width;
          paint.beginPath();
          paint.arc(wave.x, wave.y, radius, 0, Math.PI * 2);
          paint.stroke();
        }
      }
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const bubble = bubbles[i];
        const age = (now - bubble.born) / bubble.life;
        if (age >= 1) {
          bubbles.splice(i, 1);
          continue;
        }
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        paint.globalAlpha = (1 - age) * 0.9;
        paint.font = `${bubble.size}px ${font}`;
        if (bubble.travel !== undefined) {
          const off = snakeOffset(bubble.travel, age, SNAKE.amplitude, SNAKE.wavelength);
          paint.fillText(
            age < 0.6 ? '≈' : age < 0.85 ? '~' : '-',
            bubble.x + bubble.nx! * off,
            bubble.y + bubble.ny! * off,
          );
        } else {
          paint.fillText(age < 0.25 ? 'O' : age < 0.5 ? 'o' : age < 0.75 ? '°' : '·', bubble.x, bubble.y);
        }
      }
      paint.globalAlpha = 1;
    };
```

- [ ] **Step 3: Faire tourner la boucle tant qu'il reste des cercles**

Dans `render`, remplacer :

```ts
      frame = Math.abs(x - ringX) + Math.abs(y - ringY) > 0.1 || bubbles.length ? requestAnimationFrame(render) : 0;
```

par :

```ts
      frame =
        Math.abs(x - ringX) + Math.abs(y - ringY) > 0.1 || bubbles.length || ripples.length
          ? requestAnimationFrame(render)
          : 0;
```

- [ ] **Step 4: Ajouter l'ondulation au clic**

Juste avant le commentaire `// L'iframe capte la souris`, ajouter :

```ts
    // Au clic, une ondulation plus large (mode ripple seulement).
    addEventListener(
      'pointerdown',
      (event) => {
        if (mode !== 'ripple' || reduced.matches) return;
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        if ((event.target as Element).closest?.(NATIVE)) return;
        ripple(event.clientX, event.clientY, 72, 1100);
        if (!frame) frame = requestAnimationFrame(render);
      },
      { passive: true },
    );

```

- [ ] **Step 5: Vérifier le typage et le build**

Run: `npx astro check` (s'il n'est pas installé : `npm run build`)
Expected: aucune erreur dans `Cursor.astro` ni `wave.ts`.

- [ ] **Step 6: Vérifier dans le navigateur**

Run: `npm run dev`, ouvrir l'accueil avec chacun de ces paramètres et bouger la souris, cliquer :
- `?wave=ripple` : cercles qui s'élargissent derrière le curseur, plus grand au clic, couleur d'accent, disparition complète.
- `?wave=snake` : caractères `≈ ~ -` en sinusoïde derrière le curseur.
- `?wave=bubbles` : traînée de bulles identique à avant.
- `?wave=warp` : pas de traînée (l'effet vient de la Task 3).
- Naviguer vers une autre page : le mode reste actif (mémorisé pour la session).
- Console : aucune erreur.

---

### Task 3: Mode `warp` dans le renderer de l'océan

**Files:**
- Modify: `src/lib/ocean/renderer.ts`
- Modify: `src/components/ReefSchool.astro`
- Modify: `src/pages/404.astro`

**Interfaces:**
- Consumes: `WARP`, `warpOffset`, `currentWaveMode` de `../wave` (Task 1).
- Produces: option `RendererOptions.warp?: boolean` (héritée par `OceanOptions`, déjà transmise au renderer par `OceanEngine`).

- [ ] **Step 1: Option et import**

Dans `renderer.ts`, après `import { SHARK_NODES, ... } from "./world.ts";` ajouter :

```ts
// Adaptation: formule de l'onde du curseur, partagée avec le composant Cursor.
import { WARP, warpOffset } from "../wave.ts";
```

Dans `interface RendererOptions`, après `fishColors?: string[];`, ajouter :

```ts
  /** Adaptation: the pointer sends a wave through fish and wake dots (cursor effect ?wave=warp). */
  warp?: boolean;
```

- [ ] **Step 2: Champs et constructeur**

Dans la classe `AsciiRenderer`, après `private bubble: string;` ajouter :

```ts
  // Adaptation: cursor wave. warpOn is refreshed each frame from the world's pointer.
  private warp: boolean;
  private warpOn = false;
  private warpX = 0;
  private warpPY = 0;
  private warpT = 0;
```

Dans le constructeur, après `this.fishColors = options.fishColors ?? [];` ajouter :

```ts
    this.warp = options.warp ?? false;
```

- [ ] **Step 3: Mémoriser le pointeur à chaque image et ajouter l'aide**

Dans `render`, juste après `const t = world.time;` ajouter :

```ts
    // Adaptation: where the cursor wave starts, for the draw passes below.
    this.warpOn = this.warp && world.pointer.active;
    this.warpX = world.pointer.x;
    this.warpPY = world.pointer.y;
    this.warpT = t;
```

Puis, avant la méthode `private cellIndex(`, ajouter :

```ts
  /** Adaptation: vertical shift of a glyph under the cursor wave; 0 when the mode is off. */
  private warpShift(x: number, y: number) {
    if (!this.warpOn) return 0;
    return warpOffset(Math.hypot(x - this.warpX, y - this.warpPY), this.warpT, WARP);
  }

```

- [ ] **Step 4: Renforcer le sillage du pointeur**

Dans `depositWake`, remplacer :

```ts
    if (world.pointer.active) {
      this.stamp(energy, world.pointer.x, world.pointer.y, 1, 0.08);
    }
```

par :

```ts
    if (world.pointer.active) {
      // Adaptation: a wider, stronger wake in warp mode, so the wave has something to carry.
      if (this.warp) this.stamp(energy, world.pointer.x, world.pointer.y, 2, 0.18);
      else this.stamp(energy, world.pointer.x, world.pointer.y, 1, 0.08);
    }
```

- [ ] **Step 5: Décaler les poissons**

Dans `drawFish`, remplacer la boucle des tirets :

```ts
      for (const i of bucket) {
        ctx.fillText("-", (i % cols) * cw + cw / 2, ((i / cols) | 0) * ch + ch / 2 + 1);
      }
```

par :

```ts
      for (const i of bucket) {
        const x = (i % cols) * cw + cw / 2;
        const y = ((i / cols) | 0) * ch + ch / 2 + 1;
        ctx.fillText("-", x, y + this.warpShift(x, y));
      }
```

et la ligne des poissons à glyphes :

```ts
      ctx.fillText(glyphs[g.right ? 0 : 1], (g.cell % cols) * cw + cw / 2, ((g.cell / cols) | 0) * ch + ch / 2 + 1);
```

par :

```ts
      const x = (g.cell % cols) * cw + cw / 2;
      const y = ((g.cell / cols) | 0) * ch + ch / 2 + 1;
      ctx.fillText(glyphs[g.right ? 0 : 1], x, y + this.warpShift(x, y));
```

- [ ] **Step 6: Décaler les points du sillage**

Dans `drawDots`, remplacer :

```ts
        ctx.fillRect(Math.round(col * cw + cw * 0.66 - size / 2), Math.round(row * ch + ch * 0.64 - size / 2), size, size);
```

par :

```ts
        const dx = Math.round(col * cw + cw * 0.66 - size / 2);
        const dy = Math.round(row * ch + ch * 0.64 - size / 2);
        ctx.fillRect(dx, dy + Math.round(this.warpShift(dx, dy)), size, size);
```

Les requins ne sont pas décalés : ils sont rastérisés sur la grille de cellules et un décalage casserait leur silhouette.

- [ ] **Step 7: Activer l'option sur les deux océans interactifs**

Dans `src/components/ReefSchool.astro`, changer l'import :

```ts
  import { OceanEngine, TROPICAL } from '../lib/ocean';
  import { currentWaveMode } from '../lib/wave';
```

et dans les options de `new OceanEngine(canvas, [], { ... })`, après `transparent: true,` ajouter :

```ts
      warp: currentWaveMode() === 'warp',
```

Dans `src/pages/404.astro`, changer :

```ts
  import { OceanEngine } from '../lib/ocean';
  import { currentWaveMode } from '../lib/wave';
```

et remplacer `if (canvas) new OceanEngine(canvas);` par :

```ts
  if (canvas) new OceanEngine(canvas, undefined, { warp: currentWaveMode() === 'warp' });
```

- [ ] **Step 8: Vérifier le typage, les tests et le build**

Run: `npm test` puis `npm run build`
Expected: tests verts, build sans erreur.

- [ ] **Step 9: Vérifier dans le navigateur**

Run: `npm run dev`. Sur une page avec l'océan (section récif de l'accueil, page 404), avec `?wave=warp`, passer la souris sur les poissons :
- les poissons proches ondulent verticalement en vagues qui s'éloignent du curseur ;
- le sillage est plus visible qu'avant autour du curseur ;
- sans `?wave=warp` (par exemple `?wave=ripple`), le comportement de l'océan est celui d'avant ;
- hors de la zone du canvas, rien ne bouge ; console sans erreur.

Si l'onde n'est pas lisible, le dire : le mode est alors abandonné (cf. spec).

---

### Task 4: Mise à jour de la spec et bilan

**Files:**
- Modify: `docs/superpowers/specs/2026-11-09-cursor-wave-design.md`

- [ ] **Step 1: Aligner la spec sur ce qui est construit**

Dans la section « Mode `warp` », remplacer la puce sur le décalage vertical par :

```md
- Le renderer ajoute un décalage vertical `warpOffset(dist, t, WARP)` aux poissons et aux points de sillage proches du pointeur. Les requins ne sont pas décalés : ils sont rastérisés sur la grille et un décalage casserait leur silhouette.
- Seuls les océans interactifs sont concernés (récif de l'accueil, page 404) : le passage du requin (`SharkPass`) ignore le pointeur.
```

et ajouter dans « Garde-fous » : « Mémorisation du mode : `sessionStorage` (`wave`), parce que le routeur retire `?wave=` de l'adresse. »

- [ ] **Step 2: Bilan**

Dire à l'utilisateur ce qui a été vu dans le navigateur pour chaque mode et ce qui ne l'a pas été, puis lui demander quel mode garder. Le nettoyage (suppression des deux autres modes, de `?wave=` et de `sessionStorage`) est un chantier à part, après son choix.
