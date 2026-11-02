import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number(),
      categories: z.array(z.enum(['bi', 'ml', 'db', 'graph', 'app'])).min(1),
      tags: z.array(z.string()).min(1),
      cover: image(),
      coverAlt: z.string(),
      repo: z.url(),
      context: z.string(),
      team: z.string(),
      role: z.string(),
      gallery: z.array(z.object({ src: image(), alt: z.string(), caption: z.string() })),
      embeds: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
      facts: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
      learnings: z.string(),
    }),
});

export const collections = { projects };
