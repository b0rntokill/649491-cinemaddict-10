import AbstractComponent from './../abstract-component.js';

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

export default class FooterStatistics extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._cards);
  }
}
