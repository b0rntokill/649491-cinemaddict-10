import {createElement} from './../../utils.js';
import Comments from './comments.js';
import Details from './details.js';

const createFilmDetailsTemplate = (card) => {
  return `<section class="film-details">
            <form class="film-details__inner" action="" method="get">
              ${new Details(card).getTemplate()}
              ${new Comments(card.comments).getTemplate()}
            </form>
          </section>`;
};

export default class FilmDetailsList {
  constructor(card) {
    this._element = null;
    this._card = card;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
