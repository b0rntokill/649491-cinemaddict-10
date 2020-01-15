import FilmsCardComponent from './../components/main/films/card.js';
import FilmDetailsComponent from './../components/film-details/film-details.js';
import {render, replace, RenderPosition} from './../utils/render.js';

// Он должен создавать два связанных между собой инстанса классов мини-карточки фильма и попапа этого фильма (подробной информации).

export default class MovieController {
  constructor(cardContainer, detailsContainer, onDataChange) {
    this._cardContainer = cardContainer;
    this._detailsContainer = detailsContainer;
    this._onDataChange = onDataChange;
    // Этот метод жестко забинден по причине наличия в нем обращения к приватному методу this._replaceDetailsToCard() контроллера.
    // Если этого не сделать то this будет window, а у него нет метода this._replaceDetailsToCard().
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    // Это заготовки к перерендерингу в зависимости от новых данных.
    this._filmsCardComponent = null;
    this._filmDetailsComponent = null;
  }

  render(card) {
    const oldFilmsCardComponent = this._filmsCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmsCardComponent = new FilmsCardComponent(card);
    this._filmDetailsComponent = new FilmDetailsComponent(card);

    const onWatchListButtonClick = (evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        userDetails: Object.assign({}, card.userDetails, {
          watchlist: !card.userDetails.watchlist
        })
      }));
    };

    const onWatchedButtonClick = (evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        userDetails: Object.assign({}, card.userDetails, {
          alreadyWatched: !card.userDetails.alreadyWatched
        })
      }));
    };

    const onFavoriteButtonClick = (evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        userDetails: Object.assign({}, card.userDetails, {
          favorite: !card.userDetails.favorite
        })
      }));
    };

    const onCardClick = (evt) => {
      evt.preventDefault();
      const target = evt.target.className;

      if (target === `film-card__poster` || target === `film-card__title` || target === `film-card__comments`) {
        this._replaceCardToDetails();
        document.addEventListener(`keydown`, this._onEscKeyDown);
      }
    };

    const onCloseButtonClick = (evt) => {
      evt.preventDefault();
      this._replaceDetailsToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    };

    this._filmsCardComponent.setClickHandler(onCardClick);
    this._filmsCardComponent.setWatchListButtonClickHandler(onWatchListButtonClick);
    this._filmsCardComponent.setWatchedButtonClickHandler(onWatchedButtonClick);
    this._filmsCardComponent.setFavoriteButtonClickHandler(onFavoriteButtonClick);

    this._filmDetailsComponent.setCloseClickHandler(onCloseButtonClick);

    if (oldFilmsCardComponent && oldFilmDetailsComponent) {
      replace(this._filmsCardComponent, oldFilmsCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._cardContainer, this._filmsCardComponent, RenderPosition.BEFOREEND);
    }
  }

  _replaceCardToDetails() {
    return render(this._detailsContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);
  }

  _replaceDetailsToCard() {
    return this._filmDetailsComponent.getElement().remove();
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      this._replaceDetailsToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
