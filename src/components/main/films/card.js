import {getRuntimeHours} from '../../../utils/common.js';
import AbstractComponent from './../../abstract-component.js';

const ACTIVE_CLASS = `film-card__controls-item--active`;

const createFilmsCardTemplate = (card) => {
  const {title, totalRating, poster, release, runtime, genre, description} = card.filmInfo;
  const {watchlist, favorite, alreadyWatched} = card.userDetails;
  let commentsCount = `No comments`;
  const checkActiveClass = (condition) => condition ? ACTIVE_CLASS : ``;
  if (card.comments && card.comments.length !== 0) {
    commentsCount = `${card.comments.length} comments`;
  }
  const releaseDate = release.date.getFullYear();
  const mainGenre = genre[0];
  const time = getRuntimeHours(runtime);

  return `<article class="film-card">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${releaseDate}</span>
              <span class="film-card__duration">${time}</span>
              <span class="film-card__genre">${mainGenre}</span>
            </p>
            <img src="${poster}" alt="Poster ${title}" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <a class="film-card__comments">${commentsCount}</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${checkActiveClass(watchlist)}">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${checkActiveClass(alreadyWatched)}">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite ${checkActiveClass(favorite)}">Mark as favorite</button>
            </form>
        </article>`;
};

export default class FilmsCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmsCardTemplate(this._card);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
