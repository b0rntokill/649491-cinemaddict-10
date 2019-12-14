import AbstractComponent from './../abstract-component.js';

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const createMainSortTemplate = () => {
  return `<ul class="sort">
            <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
            <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
            <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
          </ul>`;
};

export default class MainSort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createMainSortTemplate();
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

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}

export {SortType};
