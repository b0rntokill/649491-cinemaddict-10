import {createFilmsCardTemplate} from './card.js';

const EXTRA_FILM_COUNT = 2;

const createFilmTopRatedMarkup = (cards) => {
  let markup = ``;
  const topRatedArray = cards.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
  if (topRatedArray[0].filmInfo.totalRating !== 0) {
    const cardsToRender = topRatedArray.slice(0, EXTRA_FILM_COUNT);
    markup = `<section class="films-list films-list--extra">
                <h2 class="films-list__title">Top rated</h2>
                <div class="films-list__container">
                ${cardsToRender.map(createFilmsCardTemplate).join(``)}
                </div>
              </section>`;
  }
  return markup;
};

const createFilmMostCommentsMarkup = (cards) => {
  let markup = ``;
  const mostCommentArray = cards.slice().sort((a, b) => b.comments.length - a.comments.length);
  if (mostCommentArray[0].comments.length) {
    const cardsToRender = mostCommentArray.slice(0, EXTRA_FILM_COUNT);
    markup = `<section class="films-list films-list--extra">
                <h2 class="films-list__title">Most commented</h2>
                <div class="films-list__container">
                ${cardsToRender.map(createFilmsCardTemplate).join(``)}
                </div>
              </section>`;
  }
  return markup;
};

const createMainFilmsTemplate = (cards) => {
  return `<section class="films">
            <section class="films-list films-list--default">
              <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
              <div class="films-list__container">
              </div>
            </section>
            ${createFilmTopRatedMarkup(cards)}
            ${createFilmMostCommentsMarkup(cards)}
          </section>`;
};

export {createMainFilmsTemplate};
