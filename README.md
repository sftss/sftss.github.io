# sftss.github.io

Portfolio de Sefer Tasdemir, en ligne sur [sftss.github.io](https://sftss.github.io/).

## Commandes

```bash
npm install
npm run dev      # développement sur http://localhost:4321
npm run build    # génère dist/
npm run preview  # sert dist/ en local
```

Node 22.23 ou plus récent est requis.

## Structure

- Projets : `src/content/projects/{fr,en}/<slug>.md`, un fichier par projet et par langue.
- Accueil : `src/i18n/home.ts`.
- Interface : `src/i18n/ui.ts`.
- Graphe : `src/lib/skills.ts` range chaque tag des projets dans une famille.
- CV : `public/assets/`.

Chaque ancienne URL `/projects/<nom>.html` redirige vers sa nouvelle page, via `src/lib/projects.ts`.
