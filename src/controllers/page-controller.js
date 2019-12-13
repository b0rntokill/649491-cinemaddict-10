import FilmsCardComponent from './../components/main/films/card.js';
import FilmDetailsComponent from './../components/film-details/film-details.js';
import DefaultFilmsComponent from './../components/main/films/films-default.js';
import ExtraFilmsComponent from './../components/main/films/films-extra.js';
import NoFilmsComponent from './../components/main/films/no-films.js';
import FilmsButtonComponent from './../components/main/films/button.js';
import {render, remove, RenderPosition} from './../utils/render.js';

const DEFAULT_FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

const renderCard = (cardListElement, detailsListElement, card) => {
  const filmsCardComponent = new FilmsCardComponent(card);

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
    const target = evt.target.className;

    if (target === `film-card__poster` || target === `film-card__title` || target === `film-card__comments`) {
      replaceCardToDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmsCardComponent.setClickHandler(onCardClick);

  const filmDetailsComponent = new FilmDetailsComponent(card);

  const onCloseButtonClick = (evt) => {
    evt.preventDefault();
    replaceDetailsToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  filmDetailsComponent.setCloseClickHandler(onCloseButtonClick);

  const replaceCardToDetails = () => {
    return render(detailsListElement, filmDetailsComponent, RenderPosition.BEFOREEND);
  };

  const replaceDetailsToCard = () => {
    return filmDetailsComponent.getElement().remove();
  };

  render(cardListElement, filmsCardComponent, RenderPosition.BEFOREEND);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._defaultFilmsComponent = new DefaultFilmsComponent();
    this._filmsButtonComponent = new FilmsButtonComponent();
  }

  render(cards) {
    const container = this._container.getElement();
    // Ну а что поделаешь. Костылики. Или в метод еще свойство, ну вообщем дизайн пилил не я :)
    const body = document.querySelector(`body`);

    const isNoMovies = cards === undefined || cards.length === 0;

    if (isNoMovies) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
    } else {
      render(container, this._defaultFilmsComponent, RenderPosition.BEFOREEND);

      let renderFilmCount = DEFAULT_FILM_COUNT;
      cards.slice(0, renderFilmCount).forEach((card) => renderCard(this._defaultFilmsComponent.getListElement(), body, card));

      const onFilmsButtonClick = (evt) => {
        evt.preventDefault();
        const currentFilmCount = renderFilmCount;
        renderFilmCount += DEFAULT_FILM_COUNT;
        cards.slice(currentFilmCount, renderFilmCount).forEach((card) => renderCard(this._defaultFilmsComponent.getListElement(), body, card));
        if (renderFilmCount >= cards.length) {
          remove(this._filmsButtonComponent);
        }
      };

      this._filmsButtonComponent.setClickHandler(onFilmsButtonClick);
      render(this._defaultFilmsComponent.getElement(), this._filmsButtonComponent, RenderPosition.BEFOREEND);

      const renderExtraList = () => {
        const topRatedArray = cards.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        const mostCommentArray = cards.slice().sort((a, b) => b.comments.length - a.comments.length);

        const extraListsTitle = {
          rated: `Top rated`,
          comment: `Most comment`
        };
        // Вот поэтому я спрашивал про более одного контроллера. Мне там надо 2 экземпляра ExtraFilmsComponent
        const renderExtraCards = (sortedCards, title) => {
          const extrafilmContainer = new ExtraFilmsComponent();
          extrafilmContainer.setTitle(title);
          sortedCards.slice(0, EXTRA_FILM_COUNT).forEach((card) => renderCard(extrafilmContainer.getListElement(), body, card));
          render(container, extrafilmContainer, RenderPosition.BEFOREEND);
        };

        if (topRatedArray[0].filmInfo.totalRating !== 0) {
          renderExtraCards(topRatedArray, extraListsTitle.rated);
        }

        if (mostCommentArray[0].comments.length) {
          renderExtraCards(mostCommentArray, extraListsTitle.comment);
        }
      };

      renderExtraList();
    }
  }
}
