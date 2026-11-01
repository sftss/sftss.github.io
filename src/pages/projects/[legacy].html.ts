import type { APIRoute } from 'astro';
import { legacyProjects } from '../../lib/projects';

type LegacyName = keyof typeof legacyProjects;

export const getStaticPaths = () =>
  Object.keys(legacyProjects).map((legacy) => ({ params: { legacy } }));

// GitHub Pages n'offre pas de 301 : chaque ancienne URL reste une page qui renvoie
// vers la nouvelle, dans la langue du visiteur, et déclare celle-ci comme canonique.
export const GET: APIRoute = ({ params, site }) => {
  const slug = legacyProjects[params.legacy as LegacyName];
  const target = `/fr/projects/${slug}/`;
  const canonical = new URL(target, site).href;

  const html = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>Sefer Tasdemir</title>
    <link rel="canonical" href="${canonical}" />
    <script>
      (function () {
        var lang = null;
        try { lang = localStorage.getItem('preferredLanguage'); } catch (e) {}
        if (lang !== 'fr' && lang !== 'en') {
          lang = (navigator.language || '').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
        }
        location.replace('/' + lang + '/projects/${slug}/');
      })();
    </script>
    <noscript><meta http-equiv="refresh" content="0; url=${target}" /></noscript>
  </head>
  <body>
    <p><a href="/fr/projects/${slug}/">Français</a> · <a href="/en/projects/${slug}/">English</a></p>
  </body>
</html>
`;

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
