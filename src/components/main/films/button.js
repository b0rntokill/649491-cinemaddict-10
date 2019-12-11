import {createElement} from './../../../utils.js';

const createFilmsButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class FilmsButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsButtonTemplate();
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
