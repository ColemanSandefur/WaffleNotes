import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: {
      name: "WaffleNotes",
    },
    navigation: {
      Collections: ["post", "series", "author"],
      Pages: ["about", "seriesArchive"],
    },
  },
  collections: {
    post: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        pubDate: fields.datetime({
          label: "Publication Date",
          defaultValue: { kind: "now" },
        }),
        updatedDate: fields.datetime({ label: "Updated Date" }),
        author: fields.relationship({
          label: "Author",
          collection: "author",
        }),
        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "src/images/posts",
          publicPath: "/src/images/posts/",
        }),
        series: fields.relationship({
          label: "Series",
          collection: "series",
        }),
        audioUrl: fields.url({ label: "Audio URL" }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
        }),
      },
    }),

    author: collection({
      label: "Authors",
      slugField: "name",
      path: "src/data/authors/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        bio: fields.text({ label: "Bio", multiline: true }),
        avatar: fields.image({
          label: "Avatar",
          directory: "src/images/authors/avatars",
          publicPath: "/src/images/authors/avatars/",
        }),
      },
    }),

    series: collection({
      label: "Series",
      slugField: "title",
      path: "src/content/series/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "src/images/series",
          publicPath: "/src/images/series/",
        }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
        }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: "About",
      path: "src/content/pages/about",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description" }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
          options: {
            image: {
              directory: "src/images/about",
              publicPath: "/src/images/about/",
            },
          },
        }),
      },
    }),
    seriesArchive: singleton({
      label: "Series Archive",
      path: "src/content/pages/series",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description" }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
          options: {
            image: {
              directory: "src/images/about",
              publicPath: "/src/images/about/",
            },
          },
        }),
      },
    }),
  },
});
