import FilmsCardComponent from './../components/main/films/card.js';
import FilmDetailsComponent from './../components/film-details/film-details.js';
import DefaultFilmsComponent from './../components/main/films/films-default.js';
import ExtraFilmsComponent from './../components/main/films/films-extra.js';
import NoFilmsComponent from './../components/main/films/no-films.js';
import FilmsButtonComponent from './../components/main/films/button.js';
import MainSortComponent from './../components/main/sort.js';
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

  const onCardClick = () => {
    replaceCardToDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
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

const renderCards = (cardsListElement, detailsListElement, cards) => {
  cards.forEach((card) => renderCard(cardsListElement, detailsListElement, card));
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._defaultFilmsComponent = new DefaultFilmsComponent();
    this._filmsButtonComponent = new FilmsButtonComponent();
    this._mainSortComponent = new MainSortComponent();
  }

  render(cards) {
    const container = this._container.getElement();
    const body = document.querySelector(`body`);
    render(container, this._mainSortComponent, RenderPosition.BEFORE);
    // У меня функция отрисовывающая кнопку, так же принимает массив карт для отрисовки.
    const renderFilmsButton = (cardsForRender) => {
      if (renderFilmCount >= cardsForRender.length) {
        return;
      }

      const onFilmsButtonClick = (evt) => {
        evt.preventDefault();
        const currentFilmCount = renderFilmCount;
        renderFilmCount += DEFAULT_FILM_COUNT;
        renderCards(this._defaultFilmsComponent.getListElement(), body, cardsForRender.slice(currentFilmCount, renderFilmCount));

        if (renderFilmCount >= cardsForRender.length) {
          remove(this._filmsButtonComponent);
        }
      };
      // Тут же навешивается слушатель.
      this._filmsButtonComponent.setClickHandler(onFilmsButtonClick);
      render(this._defaultFilmsComponent.getElement(), this._filmsButtonComponent, RenderPosition.BEFOREEND);
    };

    const isNoMovies = cards === undefined || cards.length === 0;

    if (isNoMovies) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
    }
    render(container, this._defaultFilmsComponent, RenderPosition.BEFOREEND);

    let renderFilmCount = DEFAULT_FILM_COUNT;
    renderCards(this._defaultFilmsComponent.getListElement(), body, cards.slice(0, renderFilmCount));

    renderFilmsButton(cards);

    const onSortTypeChangeClick = (sortType) => {
      let sortedCards = [];

      const sortTypeMap = {
        'default': (array) => array.slice(0, renderFilmCount),
        'date': (array) => array.slice().sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date),
        'rating': (array) => array.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
      };

      sortedCards = sortTypeMap[sortType](cards);

      this._defaultFilmsComponent.clearListElement();
      renderFilmCount = DEFAULT_FILM_COUNT;

      renderCards(this._defaultFilmsComponent.getListElement(), body, sortedCards.slice(0, renderFilmCount));
      // Поэтому приходится удалять прошлую кнопку, ибо незнаю я как тогда убрать проблему с навешиванием слушателей.
      // Хотя можно в renderFilmsButton каждый раз создавать новый экзепляр кнопки? Не, все равно ее убирать. Так прокатит. Посоветуй свое решение!
      remove(this._filmsButtonComponent);
      renderFilmsButton(sortedCards);
    };

    this._mainSortComponent.setSortTypeChangeHandler(onSortTypeChangeClick);

    const renderExtraList = () => {
      const topRatedArray = cards.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
      const mostCommentArray = cards.slice().sort((a, b) => b.comments.length - a.comments.length);

      const extraListsTitle = {
        rated: `Top rated`,
        comment: `Most comment`
      };

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
