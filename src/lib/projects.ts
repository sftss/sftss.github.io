import type { CollectionEntry } from 'astro:content';

// Ancien nom de fichier (/projects/<nom>.html) vers le slug des nouvelles pages.
export const legacyProjects = {
  IMDb: 'imdb',
  OpenFoodFact: 'open-food-facts',
  Uber: 'uber',
  Scodoc: 'scodoc',
  SocialNetworksNeo4j: 'social-networks-neo4j',
  TPDataMLxtend: 'data-mlxtend',
  Botanic: 'botanic',
} as const;

// Les fiches vivent dans src/content/projects/<langue>/<slug>.md.
export const entryLang = (entry: CollectionEntry<'projects'>) => entry.id.split('/')[0];
export const entrySlug = (entry: CollectionEntry<'projects'>) => entry.id.split('/')[1];
