import $ from 'jquery';
import productCardTemplate from './templates/product-card.html';


function mkProductCard(product) {
  const $card = $(productCardTemplate);
  $card.addClass(`shop-product--category-${product.category_id}`);
  $card.find('.card-title').text(product.name);
  $card.find('.card-img-top').attr('src', `./static/assets/images/0${product.category_id}.jpg`);
  $card.find('.card-text').text(`Price: ${product.price}€`);

  $card.find('.shop-product__details').click(() => {
    const $modal = $('#detailsModal');
    $modal.find('.modal-title').text(`More info about ${product.name}`);
    $modal.find('.modal-image').attr('src', `./static/assets/images/0${product.category_id}.jpg`);
    $modal.find('.modal-body').text(`The price of this product is € ${product.price}`);
    $modal.find('.modal-total').text(`Total 1x ${product.name} is € ${product.price}`);

    $modal.find('.shop-cart__add').click(() => {
      //  localStorage.clear();

      if (localStorage.getItem('total') === null) {
        console.log('empty');
        const total = 1;
        localStorage.setItem('total', total);
      } else {
        const total = parseInt(localStorage.getItem('total'), 10);
        localStorage.setItem('total', total + 1);
      }
      console.log('Add to cart');
      console.log(localStorage.getItem('total'));
    });

    $modal.modal('toggle');
  });
  return $card;
}


export default function mkProductsGrid(products) {
  const $containerEl = $('<div class="container-fluid"></div>');

  const $rowEl = $('<div class="row"></div>');
  $containerEl.append($rowEl);
  products
    .forEach((product) => {
      const $colEl = $('<div class="col-12 col-md-4"></div>');
      $colEl.append(mkProductCard(product));
      $rowEl.append($colEl);
    });

  return $containerEl;
}
