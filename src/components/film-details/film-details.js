import AbstractSmartComponent from './../abstract-smart-component.js';
import Comments from './comments.js';
import Details from './details.js';
import UserRating from './user-rating.js';

const createFilmDetailsTemplate = (card, options = {}) => {

  return `<section class="film-details">
            <form class="film-details__inner" action="" method="get">
              ${new Details(card, options).getTemplate()}
              ${options.isWatched ? new UserRating(options.userRating).getTemplate() : ``}
              ${new Comments(card.comments, options.emoji).getTemplate()}
            </form>
          </section>`;
};

export default class FilmDetailsList extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._isWatchlist = card.userDetails.watchlist;
    this._isFavorite = card.userDetails.favorite;
    this._isWatched = card.userDetails.alreadyWatched;
    this._userRating = card.userDetails.personalRating;
    this._emoji = null;

    // Записываем хэндлер передаваемый в класс из контроллера, в противном случае, при перерендеринге, он будет утерян. Ну и не забываем обновить в рековериЛистенерс.
    this._handler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._card, {
      isWatchlist: this._isWatchlist,
      isFavorite: this._isFavorite,
      isWatched: this._isWatched,
      userRating: this._userRating,
      emoji: this._emoji
    });
  }

  setCloseClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._handler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        this._isWatchlist = !this._isWatchlist;
        this.rerender();
      });

    element.querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, () => {
      this._isWatched = !this._isWatched;
      this.rerender();
    });

    element.querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, () => {
      this._isFavorite = !this._isFavorite;
      this.rerender();
    });

    element.querySelector(`.film-details__new-comment`)
    .addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this._emoji = evt.target.value;
      this.rerender();

    });

    if (element.querySelector(`.film-details__user-rating-score`)) {
      element.querySelector(`.film-details__user-rating-score`)
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();
        this._userRating = evt.target.value;
        this.rerender();
      });
    }
  }

  recoveryListeners() {
    this.setCloseClickHandler(this._handler);
    this._subscribeOnEvents();
  }
}
