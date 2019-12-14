import AbstractComponent from './../../abstract-component.js';

const createMainFilmsTemplate = () => {
  return `<section class="films-list films-list--default">
              <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
              <div class="films-list__container"></div>
          </section>`;
};

export default class DefaultFilms extends AbstractComponent {
  getTemplate() {
    return createMainFilmsTemplate();
  }

  getListElement() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  // clearListElement() {
  //   return this.getListElement().innerHTML = ``;
  // }
}
