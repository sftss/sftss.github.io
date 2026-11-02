import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sftss.github.io',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true,
      // La racine choisit la langue côté navigateur (src/pages/index.astro).
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-US' } },
      filter: (page) => /\/(fr|en)\//.test(page) && !page.includes('/lab/'),
    }),
  ],
});
