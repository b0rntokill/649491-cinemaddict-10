import AbstractComponent from './../../abstract-component.js';

const createFilmsButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class FilmsButton extends AbstractComponent {
  getTemplate() {
    return createFilmsButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
