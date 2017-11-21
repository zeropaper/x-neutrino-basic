import $ from 'jquery';
import './styles.css';

const template = `
<header>
  <a href="/">
    <img src="static/vf.icon.svg" alt="logo" />
  </a>
  <ul></ul>
</header>

<main>

</main>

<footer>
  made with ♥
</footer>
`;

$(() => {
  $('#root').html(template);
});
