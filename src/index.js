import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import mkCarousel from './carousel';
import mkProductsGrid from './products-grid';


let categories;
let products;
const $pageContent = $('<div class="page-content"></div>');

function updateNavbar() {
  const $navbarNav = $('.navbar-nav').empty();
  categories.forEach((category) => {
    $navbarNav.append(`<li class="nav-item">
      <a class="nav-link" href="#${category.name}">${category.name}</a>
    </li>`);
  });
}


function categoryName2Id(name) {
  const found = categories.find(category => category.name === name);
  if (!found) throw new Error(`Category ${name} was not found`);
  return found.id;
}


function mkPageContent() {
  const pageName = window.location.hash.slice(1);
  if (!categories || !products) return;

  $pageContent.empty();

  if (!pageName) {
    const $carousel = mkCarousel(categories);

    const filteredProducts = products.filter(product => product.highlight);
    const $highlightedProducts = mkProductsGrid(filteredProducts);

    $pageContent
      .append($carousel)
      .append($highlightedProducts);
    // because the HTML of the carousel
    // is added after the page loads,
    // we need to initialize the
    // Bootstrap carousel ourselves
    $carousel.carousel();
  } else {
    const categoryId = categoryName2Id(pageName);

    const filteredProducts = products.filter(product => product.category_id === categoryId);
    const $categoryProducts = mkProductsGrid(filteredProducts);

    $pageContent
      .append($categoryProducts);
  }
}

function APIEndpoint(name) {
  // neutrino will replace the following NODE_ENV
  // when using "npm run build" with "production"
  // when using "npm run start" with "development"
  return process.env.NODE_ENV === 'production' ?
    `/api/${name}` :
    `./static/${name}.json`;
}

$(() => {
  $('#root')
    .append(navbarTemplate)
    .append($pageContent);

  $.ajax(APIEndpoint('categories'))
    .done((data) => {
      categories = data;
      updateNavbar(categories);
      mkPageContent();
    });

  $.ajax(APIEndpoint('products'))
    .done((data) => {
      products = data;
      mkPageContent();
    });

  $(window).on('hashchange', mkPageContent);
});
