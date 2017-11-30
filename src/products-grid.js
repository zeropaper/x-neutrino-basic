import $ from 'jquery';
import productCardTemplate from './templates/product-card.html';


function mkProductCard(product) {
  const $card = $(productCardTemplate);
  $card.find('.card-title').text(product.name);
  $card.find('.card-img-top').attr('src', `http://via.placeholder.com/320x240?text=${product.name}`);
  $card.find('.card-text').text(`Price: ${product.price}€`);
  return $card;
}


export default function mkProductsGrid(products) {
  const $containerEl = $('<div class="container-fluid"></div>');

  const $rowEl = $('<div class="row"></div>');
  $containerEl.append($rowEl);
  products
    .filter(product => product.highlight)
    .forEach((product) => {
      const $colEl = $('<div class="col-12 col-md-4"></div>');
      $colEl.append(mkProductCard(product));
      $rowEl.append($colEl);
    });

  return $containerEl;
}
