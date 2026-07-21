module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              borderInlineStartWidth: 0,
              quotes: "none",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
          },
        },
      },
    },
  },
};
