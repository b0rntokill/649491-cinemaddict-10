import {createHeaderProfileTemplate} from './components/header/profile.js';
import {createMainNavigateTemplate} from './components/main/navigation.js';
import {createMainSortTemplate} from './components/main/sort.js';
import {createMainFilmsTemplate} from './components/main/films/films.js';
import {createFilmsCardTemplate} from './components/main/films/card.js';
import {createFilmDetailsTemplate} from './components/main/films/details.js';
import {createFilmsButtonTemplate} from './components/main/films/button.js';

const DEFAULT_FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const renderTemplate = (container, template, where = `beforeend`) => {
  container.insertAdjacentHTML(where, template);
};

const repeat = (count, fn) => {
  Array(count).fill(``).forEach(fn);
};

renderTemplate(header, createHeaderProfileTemplate());

renderTemplate(main, createMainNavigateTemplate());
renderTemplate(main, createMainSortTemplate());
renderTemplate(main, createMainFilmsTemplate());
renderTemplate(main, createFilmDetailsTemplate());

const filmsListDefault = main.querySelector(`.films-list--default .films-list__container`);
const filmsListsExtra = main.querySelectorAll(`.films-list--extra .films-list__container`);

repeat(DEFAULT_FILM_COUNT, () => {
  renderTemplate(filmsListDefault, createFilmsCardTemplate());
});

renderTemplate(filmsListDefault, createFilmsButtonTemplate());

for (const filmsList of filmsListsExtra) {
  repeat(EXTRA_FILM_COUNT, () => {
    renderTemplate(filmsList, createFilmsCardTemplate());
  });
}
