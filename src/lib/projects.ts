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

export const projectSlugs = Object.values(legacyProjects);
