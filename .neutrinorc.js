const path = require('path');

module.exports = {
  use: [
    ['neutrino-preset-airbnb-base'],
    [
      'neutrino-preset-web',
      {
        html: {
          template: path.join(__dirname, 'src/html.template.ejs'),
          title: 'My App',
        }
      }
    ],
  ]
};
