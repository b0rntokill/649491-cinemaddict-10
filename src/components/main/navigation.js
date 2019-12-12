import {createElement} from './../../utils.js';
import {FILTERS_LIST} from './../../const.js';

const filterCountMap = {
  'all': (cards) => cards.length,
  'watchlist': (cards) => cards.filter((card) => card.userDetails.watchlist).length,
  'history': (cards) => cards.filter((card) => card.userDetails.alreadyWatched).length,
  'favorites': (cards) => cards.filter((card) => card.userDetails.favorite).length
};

const generateFilters = (filters, cards) => {
  return filters.map((filter) => {
    return {
      name: filter,
      count: filterCountMap[filter.toLowerCase()](cards)
    };
  });
};

const createFilterMarkup = (filters, isActive = 0) => {
  return filters.map((filter, index) => {
    const active = index === isActive ? `main-navigation__item--active` : ``;
    const count = filter.name.toLowerCase() !== `all` ? `<span class="main-navigation__item-count">${filter.count}</span>` : ``;
    const filterName = filter.name.toLowerCase() === `all` ? `${filter.name} movies` : `${filter.name}`;

    return `<a href="#${filter.name.toLowerCase()}" class="main-navigation__item ${active}">${filterName} ${count}</a>`;
  }).join(``);
};

const createMainNavigateTemplate = (cards) => {
  const filters = generateFilters(FILTERS_LIST, cards);
  const filtersMarkup = createFilterMarkup(filters);

  return `<nav class="main-navigation">
            ${filtersMarkup}
            <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
          </nav>`;
};

export default class MainNavigate {
  constructor(cards) {
    this._element = null;
    this._cards = cards;
  }

  getTemplate() {
    return createMainNavigateTemplate(this._cards);
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
