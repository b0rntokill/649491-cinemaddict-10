import AbstractComponent from './../abstract-component.js';

const getUserRank = (cards) => {
  const watched = cards.filter((card) => card.userDetails.alredyWatched).length;
  let rank = `Novice`;
  if (watched >= 11 && watched <= 20) {
    rank = `Fan`;
  } else if (watched >= 21) {
    rank = `Movie Buff`;
  }
  return rank;
};

const createHeaderProfileTemplate = (cards) => {
  const rank = getUserRank(cards);
  return `<section class="header__profile profile">
            <p class="profile__rating">${rank}</p>
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;
};

export default class HeaderProfile extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._cards);
  }
}
