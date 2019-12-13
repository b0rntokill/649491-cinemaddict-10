import AbstractComponent from './../abstract-component.js';
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

export default class FilmDetailsList extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._card);
  }

  setCloseClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
