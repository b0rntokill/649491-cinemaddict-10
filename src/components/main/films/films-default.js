import {createElement} from '../../../utils.js';

const createMainFilmsTemplate = () => {
  return `<section class="films-list films-list--default">
              <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
              <div class="films-list__container"></div>
          </section>`;
};

export default class DefaultFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainFilmsTemplate();
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
