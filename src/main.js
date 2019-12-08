import {createHeaderProfileTemplate} from './components/header/profile.js';
import {createMainNavigateTemplate} from './components/main/navigation.js';
import {createMainSortTemplate} from './components/main/sort.js';
import {createMainFilmsTemplate} from './components/main/films/films.js';
import {createFilmsCardTemplate} from './components/main/films/card.js';
import {createFilmDetailsTemplate} from './components/main/films/details.js';
import {createFilmsButtonTemplate} from './components/main/films/button.js';
import {createFooterStatisticsTemplate} from './components/footer/statistics.js';
import {cards} from './mock/mock.js';

const DEFAULT_FILM_COUNT = 5;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const renderTemplate = (container, template, where = `beforeend`) => {
  container.insertAdjacentHTML(where, template);
};

renderTemplate(header, createHeaderProfileTemplate(cards));

renderTemplate(main, createMainNavigateTemplate(cards));
renderTemplate(main, createMainSortTemplate());
renderTemplate(main, createMainFilmsTemplate(cards));
renderTemplate(main, createFilmDetailsTemplate(cards[0]));

renderTemplate(footer, createFooterStatisticsTemplate(cards));

const filmsList = main.querySelector(`.films-list--default`);
const filmsListDefault = main.querySelector(`.films-list--default .films-list__container`);

let renderFilmCount = DEFAULT_FILM_COUNT;

cards.slice(0, renderFilmCount).forEach((card) => renderTemplate(filmsListDefault, createFilmsCardTemplate(card), `beforeend`));

renderTemplate(filmsList, createFilmsButtonTemplate());

const showMoreButton = main.querySelector(`.films-list__show-more`);

const onShowMoreButtonClick = (evt) => {
  evt.preventDefault();
  const currentFilmCount = renderFilmCount;
  renderFilmCount += DEFAULT_FILM_COUNT;
  cards.slice(currentFilmCount, renderFilmCount).forEach((card) => renderTemplate(filmsListDefault, createFilmsCardTemplate(card), `beforeend`));
  if (renderFilmCount >= cards.length) {
    showMoreButton.remove();
  }
};

showMoreButton.addEventListener(`click`, onShowMoreButtonClick);

