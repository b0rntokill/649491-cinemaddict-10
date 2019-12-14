import AbstractComponent from './../abstract-component.js';

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const ACTIVE_CLASS = `sort__button--active`;

const createMainSortTemplate = () => {
  return `<ul class="sort">
            <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${ACTIVE_CLASS}">Sort by default</a></li>
            <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
            <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
          </ul>`;
};

export default class MainSort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
    this._currentActiveElement = null;
  }

  getTemplate() {
    return createMainSortTemplate();
  }

  getCurrentActiveElement() {
    this._currentActiveElement = this.getElement().querySelector(`.sort__button--active`);

    return this._currentActiveElement;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName.toLowerCase() !== `a`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this.getCurrentActiveElement();
      this._currentActiveElement.classList.remove(ACTIVE_CLASS);
      evt.target.classList.add(ACTIVE_CLASS);
      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
