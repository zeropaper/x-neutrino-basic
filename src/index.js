import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import mkCarousel from './carousel';

$(() => {
  $.ajax('./static/categories.json')
    .done((categories) => {
      const $carousel = mkCarousel(categories);
      $('#root').append($carousel);
      // because the HTML of the carousel
      // is added after the page loads,
      // we need to initialize the
      // Bootstrap carousel ourselves
      $carousel.carousel();
    });

  $('#root').append(navbarTemplate);
});
