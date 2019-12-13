import AbstractComponent from './../../abstract-component.js';

const createMainFilmsTemplate = () => {
  return `<section class="films-list films-list--extra">
                <h2 class="films-list__title"></h2>
                <div class="films-list__container"></div>
          </section>`;
};

export default class ExtraFilms extends AbstractComponent {
  getTemplate() {
    return createMainFilmsTemplate();
  }

  setTitle(title) {
    this.getElement().querySelector(`.films-list__title`)
      .textContent = title;
  }

  getListElement() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
