- Create a repository on GitHub (https://github.com/new) and clone it locally
- `npm init` (will create the package.json)
- When asked use 'src/index.js' as entry point
- Install the neutrino dev dependencies: `npm i -D neutrino @neutrinojs/web`
- Inside your project folder, create a folder called `src` with a `index.js` inside it
- Edit the `package.json` file and add the `start` and `build` scripts like
  ```
  "build": "neutrino build --use @neutrinojs/web",
  "start": "neutrino start --use @neutrinojs/web",
  ```
- Run the server with `npm run start` (or actually just `npm start`)
- Check that everything went smoothly in your browser
- Stop the server (`CTRL+C`)
- Install jQuery with `npm i jquery` (no `-D` because it is not a development dependency)
- In your `src/index.js` import jQuery like:
  `import $ from 'jquery';`
- Restart the server (you know how to do it)
- Add something like:
  ```js
  $(() => {
    $('body').append('<h1>Hello World!</h1>');
  });
  ```
  and look at your browser if the text appears in the body
- Create a `styles.css` (inside the `src` folder) with body background-color whatever
- Add your CSS file by using `import './styles.css';`
- Look at your browser ;) (fancy.. hueeee)

## Linting your code and use Neutrino configuration file

- Linting is your friend! It will help you keeping pretty code and enforce best practices.
  add the `@neutrinojs/airbnb-base` (as dev dependency) with
  `npm i -D @neutrinojs/airbnb-base`
- Remove the `--use @neutrinojs/web` from your `package.json`
- Create a file called `.neutrinorc.js` at the root of your project with the following content:
  ```js
  module.exports = {
    use: [
      ['@neutrinojs/airbnb-base'], // first the linting!
      ['@neutrinojs/web'], // then the compilation
    ],
  };
  ```
- If you have linting errors, read them carefully (they always mention in which file and at which line the error occurs) and if you still don't understand them make a search (eslint name-of-the-error)
- Linting can also be a pain in the keyboard.  
  Luckily they are ways to disable it where it annoys (but! try to avoid that... please)
  - `/* eslint-disable */` and `/* eslint-enable */`
  - `// eslint-disable-next-line` or `// eslint-disable-line`
  You can also do this for one rule like `// eslint-disable-next-line no-console` (`no-console` is the name of the only rule to be turned off for the next line)

## Configure the Neutrino presets

- Now, in your browser, have a look at the `<title>` tag of the `<head>`, it should be something like `Webpack App` and this is not great.  
  Instead you want to have something like `My App` and to do so you can change a bit your `.neutrinorc.js` file the following way:
  ```js
  module.exports = {
    use: [
      ['@neutrinojs/airbnb-base'],
      [
        '@neutrinojs/web',
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
  **R**ead **T**he **F**ine **M**anual (starting at https://neutrino.js.org/presets/@neutrinojs/web/ )

<details><summary>Advanced HTML template</summary>


If you need to customize the HTML even further, you may want to find the template which used by Neutrino / Webpack to render the index.html
  It took me a bit of time but after following the white rabbit.
  I first looked at the `@neutrinojs/html-template` (which was mentioned in the docs of the `@neutrinojs/web`).  
  This lead me to the `html-webpack-template` module and I found the 
  template here: https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs
- Copy the `.ejs` file in your `src` directory (rename it if you want, I did it and called it `html.template.ejs`)
- In your `.neutrinorc.js` file, change the settings to make them look like:
  ```js
  const path = require('path');

  module.exports = {
    use: [
      ['@neutrinojs/airbnb-base'],
      [
        '@neutrinojs/web',
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
- Restart your server


</details>

## Adding Bootstrap and SASS loader

- Inorder to load and compile SASS file you will need to install the `node-sass` and `sass-loader` as development dependency as follow: `npm i -D node-sass sass-loader`
- Then add bootstrap 4 (at the time of writting this tutorial it is still in beta and therefore needs the `@next`) using the following command: `npm i popper.js bootstrap@next`
- Add the styles loader to your `.neutrinorc.js`
  (as described in ):
  ```js
    module.exports = {
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
  ```
- In your `src/index.js` 
  change `import 'styles.css';` to `import 'styles.scss';` and rename your style file accordingly

## Loading HTML templates

- Create a folder called `templates` in your `src` directory
- Inside the `templates` folder, add a file `navbar.html`
- Import the template in the `src/index.js` as follow
  ```js
  import navbar from './templates/navbar.html';
  ```
- Add the `navbar` to the `#root` as follow:
  ```js
  $('#root').append(navbar);
  ```

**Note:** If you want to link a resource (which is located in the `src/static` directory) from a template HTML file you need to use the relative path from the template to the resource.  
For example you want to add an image:
```html
<img src="./../static/kitten.jpg" alt="Cute furry animal" />
```

# Exercise

In order to complete the exercise you should look at the Bootstrap documentation for
- The carousel component
- The flex utilities
- The sizing utilities

**Important:** you can ask **1** question, so choose wisely what your question to the teacher will be and if you are stuck: __breath in, breath out__.

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


## AJAX loading of catalogue

- go to https://github.com/zeropaper/x-neutrino-basic/tree/exercise-carousel (the exercise-carousel branch)
- Click the "Clone or download" (green button) and then "Download ZIP"
- In your (local) repository, create a new branch `git checkout -b ajax`
- Remove the `src` directory of your repository and put the one from the `.zip` file instead
- Change the `import navbar from './templates/navbar.html';`
  to `import navbarTemplate from './templates/navbar.html';`
  That way, it is clearer what the variable is.
  Don't forget to change the name of the variable at the end of the file (where it is `append()`).
- Do the same renaming for the `carousel` import.
- Remove the "Products" (grid) part (and again... don't forget to remove it from the end of the file where it is `append()`).
- It doesn't hurt to make a commit (so you can get back to it if you skrew up things).
- Open your `src/templates/carousel.html` file, select the HTML of 1 `.carousel-item` and paste it in a new file called `carousel-item.html` (in the `templates` directory, obviously ;) )
- Clean the `carousel-item.html` from the texts
  - Remove the `active` class (important!)
  - In the `h2` tag for instance
  - Remove the `style` attribute from the `.shop-carousel-image` element
- Now we have to remove the content of the `.carousel-inner` of the `carousel.html` file.
- In the `index.js` create a function called `mkCarousel` which takes 1 argument called `items`. The function creates a jQuery object based on the `carouselTemplate` and returns it.
- We need an other function to create indicators, we call it `mkIndicator` and it takes 1 argument called `number` and return a jQuery element suitable for the Bootstrap carousel.
  ```js
  function mkIndicator(number) {
    // note that we use "template literal" here!
    return $(`<li data-target="#carousel-indicators" data-slide-to="${number}"></li>`);
  }
  ```
- One more function is needed (it's the last one for now, promised...) to create the "slides", let's call it `mkSlide` and it takes 1 argument called `item`.
  The function creates a jQuery object (and returns it) based on the `carouselItemTemplate` which you have to import at the top of your file.
- In order to test our script we need some "dummy data" and for that we create an array like this:
  ```js
  const categories = [
    { name: 'First' },
    { name: 'Second' },
  ];
  ```
- Let's use the `mkCarousel()` function to create the jQuery carousel called `$carousel` (just before `$('#root')` piece).
- We replace the `.append(carouselTemplate)` with `.append($carousel)`
- We can also replace `$('.carousel').carousel();` with `$carousel.carousel();`.
- Inside the `mkCarousel()` function
  - We keep a reference of the elements in which we will put things into (if you didn't removed the content of the `.carousel-indicators` in the `carousel.html`, do it ;) )
  - We iterate (with `items.forEach((item, number) => {})`) to create
    - The `$indicator` (with `mkIndicator(number)`)
    - The `$slide` (with `mkSlide(item)`)
    - We test if the `number` argument is equal to `0` and if this is the case we add the `active` class to `$indicator` and `$slide`
    - Finally we append `$indicator` to `$indicators` and `$slide` to `$slides`
- In the `mkSlide()` function we need to use the `item` argument to change the text of the `h2` located inside the jQuery element we created with the template.
- Now we create a dummy JSON file with called `categories.json` in the `src/static` directory with the following content:
  ```json
  [
    {
      "id": 0,
      "name": "PC"
    },
    {
      "id": 1,
      "name": "Laptop"
    },
    {
      "id": 2,
      "name": "Mac"
    }
  ]
  ```
- In the `index.js` we use the `$.ajax()` function to load the JSON file we just created like that:
  ```js
  $.ajax('./static/categories.json')
    .done((categories) => {
      /* ... */
    });
  ```
  and make changes so that the end of the file looks like:
  ```js
  $(() => {
    $.ajax('./static/categories.json')
      .done((categories) => {
        const $carousel = mkCarousel(categories);
        $('#root').append($carousel);
        // because the HTML of the carousel is added after the page loads, we need to initialize the Bootstrap carousel ourselves
        $carousel.carousel();
      });

    $('#root').append(navbarTemplate);
  });
  ```
- Now let's refactor a bit
  - Move the whole carousel related script in a new file called `carousel.js` (in the `src` directory, of course)
  - You need to export the `mkCarousel()` function like:
    ```js
    export default function mkCarousel(items) {
      // ...
    }
    ```
  - Import the `mkCarousel()` function in `index.js` using `import mkCarousel from './carousel';`
  
## Further development

The instructions are available as video

- https://www.youtube.com/watch?v=Bq4IRmdZHz4&list=PLgCgU6ZYAzeOWGnB1_yL7-IrQh4oKH-c2&index=1
- https://www.youtube.com/watch?v=KHbYxKi0sUI&list=PLgCgU6ZYAzeOWGnB1_yL7-IrQh4oKH-c2&index=2

<details><summary>products.json</summary>

```json
[
{
  "id": 0,
  "name": "Dell 1000",
  "price": 500,
  "category_id": 0
},
{
  "id": 1,
  "name": "Dell 2000",
  "price": 600,
  "category_id": 0,
  "highlight": true
},
{
  "id": 2,
  "name": "Dell 3000",
  "price": 700,
  "category_id": 0
},
{
  "id": 3,
  "name": "Dell 4000",
  "price": 800,
  "category_id": 0
},
{
  "id": 4,
  "name": "HP Workstation 1",
  "price": 350,
  "category_id": 0
},
{
  "id": 5,
  "name": "HP Workstation 2",
  "price": 450,
  "category_id": 0
},
{
  "id": 6,
  "name": "HP Workstation 3",
  "price": 550,
  "category_id": 0,
  "highlight": true
},
{
  "id": 7,
  "name": "HP Workstation 4",
  "price": 650,
  "category_id": 0
},
{
  "id": 8,
  "name": "HP Probook 1100",
  "price": 450,
  "category_id": 1
},
{
  "id": 9,
  "name": "HP Probook 2100",
  "price": 550,
  "category_id": 1,
  "highlight": true
},
{
  "id": 10,
  "name": "HP Probook 3100",
  "price": 650,
  "category_id": 1
},
{
  "id": 11,
  "name": "HP Probook 4100",
  "price": 750,
  "category_id": 1
},
{
  "id": 12,
  "name": "Sony Vaio x1",
  "price": 750,
  "category_id": 1,
  "highlight": true
},
{
  "id": 13,
  "name": "Sony Vaio x2",
  "price": 850,
  "category_id": 1
},
{
  "id": 14,
  "name": "Sony Vaio x3",
  "price": 950,
  "category_id": 1
},
{
  "id": 15,
  "name": "Sony Vaio x4",
  "price": 1050,
  "category_id": 1
},
{
  "id": 16,
  "name": "MacBook Pro 1",
  "price": 1150,
  "category_id": 2
},
{
  "id": 17,
  "name": "MacBook Pro 2",
  "price": 1250,
  "category_id": 2,
  "highlight": true
},
{
  "id": 18,
  "name": "MacBook Pro 3",
  "price": 1350,
  "category_id": 2
},
{
  "id": 19,
  "name": "MacBook Pro 4",
  "price": 1450,
  "category_id": 2
},
{
  "id": 20,
  "name": "MacBook Pro 5",
  "price": 1550,
  "category_id": 2
},
{
  "id": 21,
  "name": "MacBook Pro 6",
  "price": 1650,
  "category_id": 2
},
{
  "id": 22,
  "name": "MacBook Pro 7",
  "price": 1750,
  "category_id": 2
},
{
  "id": 23,
  "name": "MacBook Pro 8",
  "price": 1850,
  "category_id": 2
}]
```

</details>