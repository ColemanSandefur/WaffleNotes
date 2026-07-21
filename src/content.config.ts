import { defineCollection, reference } from "astro:content";

import { glob, file } from "astro/loaders";

import { z } from "astro/zod";

const post = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: reference("author"),
      draft: z.boolean().default(false),
      coverImage: image(),
      series: reference("series").optional(),
      audioUrl: z.string().optional(),
    }),
});

const author = defineCollection({
  loader: glob({ base: "./src/data/authors", pattern: "**/*.json" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string().optional(),
      avatar: image().optional(),
    }),
});

const series = defineCollection({
  loader: glob({ base: "./src/content/series", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean().default(false),
      coverImage: image(),
    }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { post, author, series };
