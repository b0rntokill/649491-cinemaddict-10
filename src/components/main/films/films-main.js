import {createElement} from '../../../utils.js';

const createMainFilmsTemplate = () => {
  return `<section class="films"></section>`;
};

export default class MainFilms {
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
