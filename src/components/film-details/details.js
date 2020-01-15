import {MONTH_NAMES} from './../../const.js';
import {castTimeFormat, getRuntimeHours, getCommaSeparatedLine} from '../../utils/common.js';
import AbstractComponent from './../abstract-component.js';

const INPUT_CHECKED = `checked`;

const createGenreMarkup = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(``);
};

const createDetailsTemplate = (card, options) => {
  const {isWatchlist, isFavorite, isWatched, userRating} = options;
  const {title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, release, runtime, genre, description} = card.filmInfo;
  const releaseDate = `${castTimeFormat(release.date.getDate())} ${MONTH_NAMES[release.date.getMonth()]} ${release.date.getFullYear()}`;
  const time = getRuntimeHours(runtime);
  const checkInput = (condition) => condition ? INPUT_CHECKED : ``;
  const checkEndingWord = (array) => array.length >= 1 ? `s` : ``;

  return `<div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${poster}" alt="Poster ${title}">

                <p class="film-details__age">${ageRating}+</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">${alternativeTitle}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${totalRating}</p>
                    <p class="film-details__user-rating">Your rate ${userRating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${getCommaSeparatedLine(director)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writer${checkEndingWord(writers)}</td>
                    <td class="film-details__cell">${getCommaSeparatedLine(writers)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actor${checkEndingWord(actors)}</td>
                    <td class="film-details__cell">${getCommaSeparatedLine(actors)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${releaseDate}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${time}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${getCommaSeparatedLine(release.releaseCountry)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genre${checkEndingWord(genre)}</td>
                    <td class="film-details__cell">
                      ${createGenreMarkup(genre)}
                  </tr>
                </table>

                <p class="film-details__film-description">${description}</p>
              </div>
            </div>

            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${checkInput(isWatchlist)}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${checkInput(isWatched)}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${checkInput(isFavorite)}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>`;
};

export default class Details extends AbstractComponent {
  constructor(card, options) {
    super();
    this._card = card;
    this._options = options;
  }

  getTemplate() {
    return createDetailsTemplate(this._card, this._options);
  }
}
