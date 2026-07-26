import type { CollectionEntry } from "astro:content";

export function getLatestPost(
  series: CollectionEntry<"series">,
  posts: CollectionEntry<"post">[],
) {
  return posts.find(
    (post) => post.data.series?.id === series.id && post.data.draft === false,
  );
}

export function getNumPosts(
  series: CollectionEntry<"series">,
  posts: CollectionEntry<"post">[],
) {
  return posts.filter(
    (post) => post.data.series?.id === series.id && post.data.draft === false,
  ).length;
}

export const SeriesUtils = {
  getLatestPost,
  getNumPosts,
};
