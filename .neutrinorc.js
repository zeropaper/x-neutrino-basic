module.exports = {
  // aimed to be able to publish on GH pages
  options: {
    output: 'docs'
  },

  use: [
    ['@neutrinojs/airbnb-base'],
    [
      '@neutrinojs/web',
      {
        style: {
          loaders: [
            {
              loader: 'sass-loader',
            }
          ]
        },
        html: {
          title: 'My App'
        }
      }
    ],
  ]
};
