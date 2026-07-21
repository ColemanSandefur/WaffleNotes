import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    post: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: {
        contentField: 'content',
      },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.datetime({
          label: 'Publication Date',
          defaultValue: { kind: 'now' }
        }),
        updatedDate: fields.datetime({ label: 'Updated Date' }),
        author: fields.relationship({
          label: 'Author',
          collection: 'author',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'src/images/posts',
          publicPath: '/src/images/posts/',
        }),
        series: fields.relationship({
          label: 'Series',
          collection: 'series',
        }),
        audioUrl: fields.url({ label: 'Audio URL' }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),

    author: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/data/authors/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'src/images/authors/avatars',
          publicPath: '/src/images/authors/avatars/',
        }),
      },
    }),

    series: collection({
      label: 'Series',
      slugField: 'title',
      path: 'src/content/series/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'src/images/series',
          publicPath: '/src/images/series/',
        }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),
  },
});