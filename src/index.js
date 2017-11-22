import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';

const navbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">MyApp</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbar">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Category 1 <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Category 2 <span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>
`;

const pictures = [
  'kitten-2.jpg',
  'kitten-little.jpg',
  'kitten.jpg',
  'koala.jpg',
  'pinguin.jpg',
  'sloth.jpg',
];

function mkCard(img) {
  return `
<div class="card">
  <img class="card-img-top" src="static/${img}" alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title">Card title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
`;
}

const grid = `
<div class="container-fluid">
  <div class="row shop-products-row">
    <div class="col-12 col-lg-4">${mkCard(pictures[0])}</div>
    <div class="col-12 col-lg-4">${mkCard(pictures[1])}</div>
    <div class="col-12 col-lg-4">${mkCard(pictures[2])}</div>
  </div>
  <div class="row shop-products-row">
    <div class="col-12 col-lg-4">${mkCard(pictures[3])}</div>
    <div class="col-12 col-lg-4">${mkCard(pictures[4])}</div>
    <div class="col-12 col-lg-4">${mkCard(pictures[5])}</div>
  </div>
</div>
`;


$(() => {
  $('#root')
    .append(navbar)
    .append(grid);
});
