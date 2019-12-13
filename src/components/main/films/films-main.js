import AbstractComponent from './../../abstract-component.js';

const createMainFilmsTemplate = () => {
  return `<section class="films"></section>`;
};

export default class MainFilms extends AbstractComponent {
  getTemplate() {
    return createMainFilmsTemplate();
  }
}
