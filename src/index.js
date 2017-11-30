import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import mkCarousel from './carousel';
import mkProductsGrid from './products-grid';


function updateNavbar(categories) {
  const $navbarNav = $('.navbar-nav').empty();
  categories.forEach((category) => {
    $navbarNav.append(`<li class="nav-item">
      <a class="nav-link" href="#">${category.name}</a>
    </li>`);
  });
}

$(() => {
  $('#root').append(navbarTemplate);

  $.ajax('./static/categories.json')
    .done((categories) => {
      const $carousel = mkCarousel(categories);
      $('#root').append($carousel);
      // because the HTML of the carousel
      // is added after the page loads,
      // we need to initialize the
      // Bootstrap carousel ourselves
      $carousel.carousel();
      updateNavbar(categories);
    });

  $.ajax('./static/products.json')
    .done((products) => {
      const $productsGrid = mkProductsGrid(products);
      $('#root').append($productsGrid);
    });
});
