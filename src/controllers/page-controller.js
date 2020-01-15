import DefaultFilmsComponent from './../components/main/films/films-default.js';
import ExtraFilmsComponent from './../components/main/films/films-extra.js';
import NoFilmsComponent from './../components/main/films/no-films.js';
import FilmsButtonComponent from './../components/main/films/button.js';
import MainSortComponent from './../components/main/sort.js';
import MovieController from './movie-controller.js';
import {render, remove, RenderPosition} from './../utils/render.js';

const DEFAULT_FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

const EXTRA_LIST_TITLE = {
  RATED: `Top rated`,
  COMMENT: `Most comment`
};

const renderCards = (cardsListElement, detailsListElement, cards, onDataChange) => {
  return cards.map((card) => {
    const movieController = new MovieController(cardsListElement, detailsListElement, onDataChange);
    movieController.render(card);
    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._body = document.querySelector(`body`);

    this._cards = [];
    // Коллекция отрисованных контроллеров карточек
    this._showedMovieControllers = [];
    this._showedExtraFilmsContainers = [];
    this._renderFilmCount = DEFAULT_FILM_COUNT;

    this._onDataChange = this._onDataChange.bind(this);

    this._extraFilmsContainer = null;
    this._noFilmsComponent = new NoFilmsComponent();
    this._defaultFilmsComponent = new DefaultFilmsComponent();
    this._filmsButtonComponent = new FilmsButtonComponent();
    this._mainSortComponent = new MainSortComponent();

    // Этот метод жестко забинден по причине наличия в нем обращения к приватному свойству this._cards контроллера.
    // Если этого не сделать то this будет window, а у него нет свойства this._cards.
    this._onSortTypeChangeClick = this._onSortTypeChangeClick.bind(this);
    this._mainSortComponent.setSortTypeChangeHandler(this._onSortTypeChangeClick);
  }

  render(cards) {
    this._cards = cards;
    const container = this._container.getElement();

    render(container, this._mainSortComponent, RenderPosition.BEFORE);

    const isNoMovies = cards === undefined || cards.length === 0;

    if (isNoMovies) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
    }

    this._renderDefaultCards(this._cards);
    this._renderExtraList();
  }

  _renderDefaultCards(cardsForRender) {
    render(this._container.getElement(), this._defaultFilmsComponent, RenderPosition.AFTERBEGIN);

    const newCards = renderCards(this._defaultFilmsComponent.getListElement(), this._body, cardsForRender.slice(0, this._renderFilmCount), this._onDataChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

    this._renderFilmsButton(cardsForRender);
  }

  _renderExtraList() {
    if (this._showedExtraFilmsContainers) {
      this._showedExtraFilmsContainers.map((it) => {
        remove(it);
      });
    }

    const topRatedArray = this._cards.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    const mostCommentArray = this._cards.slice().sort((a, b) => b.comments.length - a.comments.length);

    if (topRatedArray[0].filmInfo.totalRating !== 0) {
      this._renderExtraCards(topRatedArray, EXTRA_LIST_TITLE.RATED);
    }

    if (mostCommentArray[0].comments.length) {
      this._renderExtraCards(mostCommentArray, EXTRA_LIST_TITLE.COMMENT);
    }
  }

  _renderExtraCards(sortedCards, title) {
    this._extraFilmsContainer = new ExtraFilmsComponent();
    // Записываем массив отрисованных экстра карточек фильмов, для перерендеривания при нажатии кнопок в дефолтном списке карточек
    this._showedExtraFilmsContainers = this._showedExtraFilmsContainers.concat(this._extraFilmsContainer);
    this._extraFilmsContainer.setTitle(title);
    renderCards(this._extraFilmsContainer.getListElement(), this._body, sortedCards.slice(0, EXTRA_FILM_COUNT), this._onDataChange);
    render(this._container.getElement(), this._extraFilmsContainer, RenderPosition.BEFOREEND);
  }

  _renderFilmsButton(cardsForRender) {
    if (this._renderFilmCount >= cardsForRender.length) {
      return;
    }

    const onFilmsButtonClick = (evt) => {
      evt.preventDefault();
      const currentFilmCount = this._renderFilmCount;
      this._renderFilmCount += DEFAULT_FILM_COUNT;
      renderCards(this._defaultFilmsComponent.getListElement(), this._body, cardsForRender.slice(currentFilmCount, this._renderFilmCount));

      if (this._renderFilmCount >= cardsForRender.length) {
        remove(this._filmsButtonComponent);
      }
    };

    this._filmsButtonComponent.setClickHandler(onFilmsButtonClick);
    render(this._defaultFilmsComponent.getElement(), this._filmsButtonComponent, RenderPosition.BEFOREEND);
  }

  _onSortTypeChangeClick(sortType) {
    let sortedCards = [];

    const sortTypeMap = {
      'default': (array) => array,
      'date': (array) => array.slice().sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date),
      'rating': (array) => array.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
    };

    sortedCards = sortTypeMap[sortType](this._cards);

    this._defaultFilmsComponent.clearListElement();
    this._renderFilmCount = DEFAULT_FILM_COUNT;
    this._showedMovieControllers = [];
    remove(this._filmsButtonComponent);
    this._renderDefaultCards(sortedCards);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    movieController.render(this._cards[index]);
    this._renderExtraList();
  }
}
