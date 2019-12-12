import HeaderProfileComponent from './components/header/profile.js';
import MainNavigateComponent from './components/main/navigation.js';
import MainSortComponent from './components/main/sort.js';
import MainFilmsComponent from './components/main/films/films-main.js';
import DefaultFilmsComponent from './components/main/films/films-default.js';
import ExtraFilmsComponent from './components/main/films/films-extra.js';
import NoFilmsComponent from './components/main/films/no-films.js';
import FilmsCardComponent from './components/main/films/card.js';
import FilmDetailsComponent from './components/film-details/film-details.js';
import FilmsButtonComponent from './components/main/films/button.js';
import FooterStatisticsComponent from './components/footer/statistics.js';
import {renderElement, RenderPosition} from './utils.js';
import {cards} from './mock/mock.js';

const DEFAULT_FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const body = document.querySelector(`body`);

const renderCard = (cardListElement, detailsListElement, card) => {
  const filmsCardComponent = new FilmsCardComponent(card);
  const cardPoster = filmsCardComponent.getElement().querySelector(`.film-card__poster`);
  const cardTitle = filmsCardComponent.getElement().querySelector(`.film-card__title`);
  const cardComments = filmsCardComponent.getElement().querySelector(`.film-card__comments`);

  const filmDetailsComponent = new FilmDetailsComponent(card);
  const closeButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  const replaceCardToDetails = () => {
    return renderElement(detailsListElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const replaceDetailsToCard = () => {
    return filmDetailsComponent.getElement().remove();
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      replaceDetailsToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onCardClick = (evt) => {
    evt.preventDefault();
    replaceCardToDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onCloseButtonClick = (evt) => {
    evt.preventDefault();
    replaceDetailsToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  cardPoster.addEventListener(`click`, onCardClick);
  cardTitle.addEventListener(`click`, onCardClick);
  cardComments.addEventListener(`click`, onCardClick);
  closeButton.addEventListener(`click`, onCloseButtonClick);

  renderElement(cardListElement, filmsCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const isNoMovies = cards === undefined || cards.length === 0;

renderElement(header, new HeaderProfileComponent(cards).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MainNavigateComponent(cards).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MainSortComponent().getElement(), RenderPosition.BEFOREEND);

const mainFilmsComponent = new MainFilmsComponent(cards);

const renderCards = (condition) => {
  if (condition) {
    renderElement(main, mainFilmsComponent.getElement(), RenderPosition.BEFOREEND);
    renderElement(mainFilmsComponent.getElement(), new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
  } else {
    const defaultFilmsComponent = new DefaultFilmsComponent();
    const filmsListDefault = defaultFilmsComponent.getElement().querySelector(`.films-list__container`);
    renderElement(mainFilmsComponent.getElement(), defaultFilmsComponent.getElement(), RenderPosition.BEFOREEND);

    const filmsButtonComponent = new FilmsButtonComponent();
    renderElement(defaultFilmsComponent.getElement(), filmsButtonComponent.getElement(), RenderPosition.BEFOREEND);
    const showMoreButton = defaultFilmsComponent.getElement().querySelector(`.films-list__show-more`);

    let renderFilmCount = DEFAULT_FILM_COUNT;
    cards.slice(0, renderFilmCount).forEach((card) => renderCard(filmsListDefault, body, card));

    const renderExtraList = () => {
      const topRatedArray = cards.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
      const mostCommentArray = cards.slice().sort((a, b) => b.comments.length - a.comments.length);

      const extraListsTitle = {
        rated: `Top rated`,
        comment: `Most comment`
      };

      const renderExtraCards = (sortedCards, title) => {
        const filmsListExtra = new ExtraFilmsComponent();
        filmsListExtra.getElement().querySelector(`.films-list__title`).textContent = title;
        const extraList = filmsListExtra.getElement().querySelector(`.films-list__container`);
        sortedCards.slice(0, EXTRA_FILM_COUNT).forEach((card) => renderCard(extraList, body, card));
        renderElement(mainFilmsComponent.getElement(), filmsListExtra.getElement(), RenderPosition.BEFOREEND);
      };

      if (topRatedArray[0].filmInfo.totalRating !== 0) {
        renderExtraCards(topRatedArray, extraListsTitle.top);
      }

      if (mostCommentArray[0].comments.length) {
        renderExtraCards(topRatedArray, extraListsTitle.comment);
      }
    };

    renderExtraList();

    renderElement(main, mainFilmsComponent.getElement(), RenderPosition.BEFOREEND);

    const onShowMoreButtonClick = (evt) => {
      evt.preventDefault();
      const currentFilmCount = renderFilmCount;
      renderFilmCount += DEFAULT_FILM_COUNT;
      cards.slice(currentFilmCount, renderFilmCount).forEach((card) => renderCard(filmsListDefault, body, card));
      if (renderFilmCount >= cards.length) {
        showMoreButton.remove();
      }
    };
    showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
  }
};

renderCards(isNoMovies);

renderElement(footer, new FooterStatisticsComponent(cards).getElement(), RenderPosition.BEFOREEND);
