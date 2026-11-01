import type { CollectionEntry } from 'astro:content';
import { entrySlug } from './projects';

export const families = {
  db: ['SQL', 'PostgreSQL', 'SQL Server', 'UML', 'PowerAMC'],
  bi: ['Power BI', 'DAX', 'Excel', 'seaborn', 'Leaflet'],
  etl: ['SSIS', 'Azure', 'Azure Data Factory', 'Knime'],
  ml: ['Python', 'scikit-learn', 'pandas', 'MLxtend', 'Dialogflow'],
  graph: ['Neo4j', 'Cypher'],
  app: ['Laravel', 'PHP', 'JavaScript', 'C#', 'WPF', '.NET'],
} as const;

export type Family = keyof typeof families;

// Bibliothèques de détail, gardées sur les fiches mais trop fines pour le graphe.
const ignored = new Set(['Faker', 'Npgsql']);

export interface GraphProject {
  id: string;
  title: string;
  href: string;
}

export interface GraphTool {
  id: string;
  name: string;
  family: Family;
  projects: string[];
}

export const buildGraph = (entries: CollectionEntry<'projects'>[], lang: string) => {
  const known = new Set<string>(Object.values(families).flat());
  entries
    .flatMap((entry) => entry.data.tags)
    .filter((tag) => !known.has(tag) && !ignored.has(tag))
    .forEach((tag) => {
      throw new Error(`Tag sans famille dans src/lib/skills.ts : ${tag}`);
    });

  const projects: GraphProject[] = entries.map((entry) => ({
    id: `project-${entrySlug(entry)}`,
    title: entry.data.title,
    href: `/${lang}/projects/${entrySlug(entry)}/`,
  }));

  const tools: GraphTool[] = (Object.entries(families) as [Family, readonly string[]][]).flatMap(
    ([family, names]) =>
      names
        .map((name, index) => ({
          id: `tool-${family}-${index}`,
          name,
          family,
          projects: entries
            .filter((entry) => entry.data.tags.includes(name))
            .map((entry) => `project-${entrySlug(entry)}`),
        }))
        .filter((tool) => tool.projects.length > 0),
  );

  return { projects, tools };
};
