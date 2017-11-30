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