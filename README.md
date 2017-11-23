- create a folder (and enter it!)
- `npm init` (will create the package.json)
- when asked use 'src/index.js' as entry point
- install the neutrino dev dependencies: `npm i -D neutrino neutrino-preset-web`
- inside your project folder, create a folder called `src` with a `index.js` inside it
- edit the `package.json` file and add the `start` and `build` scripts like
```
"build": "neutrino build --use neutrino-preset-web",
"start": "neutrino start --use neutrino-preset-web",
```
- run the server with `npm run start` (or actually just `npm start`)
- check that everything went smoothly in your browser
- stop the server (`CTRL+C`)
- install jQuery with `npm i jquery` (no `-D` because it is not a development dependency)
- in your `src/index.js` import jQuery like:
  `import $ from 'jquery';`
- restart the server (you know how to do it)
- add something like:
  ```js
  $(() => {
    $('body').text('Hello World!');
  });
  ```
  and look at your browser if the text appears in the body
- create a `styles.css` (inside the `src` folder) with body background-color whatever
- add your CSS file by using `import './styles.css';`
- look at your browser ;) (fancy.. hueeee)

- linting is your friend!
  add the `neutrino-preset-airbnb-base` (as dev dependency) with
  `npm i -D neutrino-preset-airbnb-base`
- remove the `--use neutrino-preset-web` from your `package.json`
- create a file called `.neutrinorc.js` at the root of your project with the following content:
  ```js
  module.exports = {
    use: [
      ['neutrino-preset-airbnb-base'], // first the linting!
      ['neutrino-preset-web'], // then the compilation
    ],
  };
  ```
- linting can be a pain in the keyboard, luckily they are ways to disable it where it annoys (but! try to avoid that... please)
  - `/* eslint-disable */` and `/* eslint-enable */`
  - `// eslint-disable-next-line` or `// eslint-disable-line`
  You can also do this for one rule like `// eslint-disable-next-line no-console` (`no-console` is the name of the only rule to be turned off for the next line)
- now, in your browser, have a look at the `<title>` tag of the `<head>`, it should be something like `Webpack App` and this is not great.  
  Instead you want to have something like `My App` and to do so you can change a bit your `.neutrinorc.js` file the following way:
  ```js
  module.exports = {
    use: [
      ['neutrino-preset-airbnb-base'],
      [
        'neutrino-preset-web',
        {
          html: {
            title: 'My App'
          }
        }
      ],
    ]
  };
  ```
  In order to find additional configuration you will have to
  *R*ead *T*he *F*ine *M*anual (starting at https://neutrino.js.org/presets/neutrino-preset-web/ )

<detail><summary>Advanced HTML template</summary>

If you need to customize the HTML even further, you may want to find the template which used by Neutrino / Webpack to render the index.html
  It took me a bit of time but after following the white rabbit.
  I first looked at the `neutrino-middleware-html-template` (which was mentioned in the docs of the `neutrino-preset-web`).  
  This lead me to the `html-webpack-template` module and I found the 
  template here: https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs
- Copy the `.ejs` file in your `src` directory (rename it if you want, I did it and called it `html.template.ejs`)
- In your `.neutrinorc.js` file, change the settings to make them look like:
  ```js
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
  ```
- Make changes in the template (be careful with what you change though)
- restart your server

</detail>

# Adding Bootstrap and SASS loader

- install the loader which will allows you to use SASS as development dependency `npm i -D neutrino-middleware-styles-loader`
  (I had to search for that one the other ones were not working correctly)
- `npm i popper.js bootstrap@next`
- add the styles loader to your `.neutrinorc.js`:
  ```js
    module.exports = {
    use: [
      ['neutrino-preset-airbnb-base'],
      ['neutrino-middleware-styles-loader'],
      [
        'neutrino-preset-web',
        {
          html: {
            title: 'My App',
          }
        }
      ],
    ]
  };
  ```
- in your `src/index.js` 
  change `import 'styles.css';` to `import 'styles.scss';` and rename your style file accordingly
- if compilation is not working, you might need to install sass-loader and node-sass: `npm i -D sass-loader node-sass`

# Exercise

In order to complete the exercise you should look at the Bootstrap documentation for
- the carousel component
- the flex utilities
- the spacing utilities

## Navbar

- Must use the dark theme
- 2 menu points, the last one being active

## Custom carousel component

- Add a carousel component with a height of half the height of the viewport but not less than 200px
- The carousel must have 4 slides
- Each slide must be split in 2 equally wide blocks
  - 1 block with:
    - A title
    - A short text
    - A button
    - It must have a background color
    - Use the full height
    - A padding equivalent to the half of grid gutter width bootstrap variable
  - 1 block with an image which keeps its original proportions
- The first and third slides must have the text block on the left and their texts aligned on the right
- The second and fourth slide must have the text block on the right and their texts aligned on the left
- The indicators must be circles of 15px radius and use the bootstrap primary color

![image](https://user-images.githubusercontent.com/65971/33160695-a6e1d4fc-d01e-11e7-9c05-853c27d546c4.png)