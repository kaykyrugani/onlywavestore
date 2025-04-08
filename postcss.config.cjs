module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    },
    'postcss-custom-media': {},
    'postcss-custom-properties': {},
    'postcss-calc': {},
    'postcss-color-function': {},
    'postcss-discard-duplicates': {},
    'postcss-discard-empty': {},
    'postcss-minify-gradients': {},
    'postcss-minify-selectors': {},
    'postcss-normalize-charset': {},
    'postcss-normalize-display-values': {},
    'postcss-normalize-positions': {},
    'postcss-normalize-repeat-style': {},
    'postcss-normalize-string': {},
    'postcss-normalize-timing-functions': {},
    'postcss-normalize-unicode': {},
    'postcss-normalize-url': {},
    'postcss-ordered-values': {},
    'postcss-reduce-initial': {},
    'postcss-reduce-transforms': {},
    'postcss-svgo': {},
    'postcss-unique-selectors': {},
    'cssnano': {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    },
  },
}; 