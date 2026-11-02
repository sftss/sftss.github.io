# sftss.github.io

Portfolio de Sefer Tasdemir, en ligne sur [sftss.github.io](https://sftss.github.io/).

Site statique Astro, en français et en anglais, publié sur GitHub Pages par GitHub Actions.

## Commandes

```bash
npm install
npm run dev      # développement sur http://localhost:4321
npm run build    # génère dist/
npm run preview  # sert dist/ en local
```

Node 22.23 ou plus récent est requis.

## Modifier le contenu

- Projets : `src/content/projects/{fr,en}/<slug>.md`, un fichier par projet et par langue.
- Accueil : `src/i18n/home.ts`.
- Interface : `src/i18n/ui.ts`.
- Graphe : `src/lib/skills.ts` range chaque tag des projets dans une famille. Le build échoue si un tag n'y figure pas.
- CV : `public/assets/`. Garder les noms de fichiers, car leurs URL ont pu être envoyées à des recruteurs.

Chaque ancienne URL `/projects/<nom>.html` redirige vers sa nouvelle page, via `src/lib/projects.ts`.
