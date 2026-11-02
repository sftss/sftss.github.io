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
