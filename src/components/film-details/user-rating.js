import AbstractComponent from './../abstract-component.js';
import {USER_SCORES} from './../../const.js';

const INPUT_CHECKED = `checked`;

const createUserRatingMarkup = (scores, userScore) => {
  return scores.map((score) => {
    const isChecked = score === userScore.toString() ? INPUT_CHECKED : ``;
    return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${score}" id="rating-${score}" ${isChecked}>
            <label class="film-details__user-rating-label" for="rating-${score}">${score}</label>
            `;
  }).join(``);
};

const createUserRatingTemplate = (userRating) => {
  return `<div class="form-details__middle-container">
            <section class="film-details__user-rating-wrap">
              <div class="film-details__user-rating-controls">
                <button class="film-details__watched-reset" type="button">Undo</button>
              </div>

              <div class="film-details__user-score">
                <div class="film-details__user-rating-poster">
                  <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
                </div>

                <section class="film-details__user-rating-inner">
                  <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

                  <p class="film-details__user-rating-feelings">How you feel it?</p>

                  <div class="film-details__user-rating-score">
                    ${createUserRatingMarkup(USER_SCORES, userRating)}
                  </div>
                </section>
              </div>
            </section>
          </div>`;
};

export default class UserRating extends AbstractComponent {
  constructor(userRating) {
    super();
    this._userRating = userRating;
  }

  getTemplate() {
    return createUserRatingTemplate(this._userRating);
  }
}
