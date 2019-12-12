import {createElement} from './../../utils.js';

const getFilmTotalFormat = (number) => {
  let thousands = Math.trunc((number / 1000));
  const lessThousand = number % 1000;
  return thousands ? `${thousands} ${lessThousand}` : `${lessThousand}`;
};

const createFooterStatisticsTemplate = (cards) => {
  const filmTotal = getFilmTotalFormat(cards.length);
  return `<section class="footer__statistics">
            <p>${filmTotal} movies inside</p>
          </section>`;
};

export default class FooterStatistics {
  constructor(cards) {
    this._element = null;
    this._cards = cards;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._cards);
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
