import {getRandomValue, getRandomBooleanValue, getRandomArrayItem, getRandomUniqueArray} from '../utils/common.js';

const RELEASE_YEAR_MIN = 1976;
const RELEASE_YEAR_MAX = 2019;
const RELEASE_MONTH_MAX = 11;
const RELEASE_DAY_MAX = 30;
const ID_MAX = 100500;
const RUNNING_TIME_HOURS_MAX = 3;
const RUNNING_TIME_HOURS_MIN = 1;
const RUNNING_TIME_MINUTES_MAX = 60;
const GENRES_MAX = 5;
const DESCRIPTION_PARAGRAPH_MAX = 3;
const COUNTRY_MAX = 3;
const ACTORS_MAX = 4;
const WRITERS_MAX = 3;
const DIRECTORS_MAX = 1;
const COMMENTATORS_NAME = 1;
const RATING_MAX = 9;
const POSTER_PATH = `./images/posters/`;
const EMOJI_PATH = `./images/emoji/`;

const CARDS_COUNT = 22;
const COMMENTS_MAX = 20;

const FILMS_NAMES = [
  `Full Metal Jacket`,
  `Apocalypse Now`,
  `The Shawshank Redemption`,
  `Reservoir Dogs`,
  `Goodfellas`,
  `The Departed`,
  `Fight Club`,
  `The House that Jack Built`,
  `The Inglorious Bastards`,
  `Rick and Morty`,
  `Back to the Future`,
  `Lock Stock and Two Smoking Barrels`,
  `Parasite`,
  `Schindler's List `,
  `Scott Pilgrim vs. the World`,
  `The Big Lebowski`,
  `No Country for Old Men`
];

const GENRES_LIST = [
  `Absurdist/surreal/whimsical`,
  `Action`,
  `Adventure`,
  `Comedy`,
  `Crime`,
  `Drama`,
  `Fantasy`,
  `Historical`,
  `Historical fiction`,
  `Horror`,
  `Magical realism`,
  `Mystery`,
  `Paranoid fiction`,
  `Philosophical`,
  `Political`,
  `Romance`,
  `Saga`,
  `Satire`,
  `Science fiction`,
  `Social`,
  `Speculative`,
  `Thriller`,
  `Urban`,
  `Western`
];

const DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const DESCRIPTIONS_LIST = DESCRIPTIONS.split(`. `)
  .map((el) => {
    if (!el.endsWith(`.`)) {
      el += `.`;
    }
    return el;
  });

const COUNTRIES_LIST = [
  `USA`,
  `Germany`,
  `Belgium`,
  `France`,
  `Italia`,
  `Romania`,
  `Poland`
];

const NAMES_LIST = [
  `Nicole Kidman`,
  `Lauren Bacall`,
  `Robert De Niro`,
  `Jack Nicholson`,
  `Leonardo Di Caprio`,
  `Bruce Lee`,
  `Morgan Freeman`,
  `Charles Chaplin`,
  `Al Pacino`,
  `John Wayne`,
  `Jeff Bridges`,
  `Javier Bardem`,
  `Brad Pitt`,
  `Tommy Lee Jones`,
  `Joaquin Phoenix`
];

const AGES_RATING = [
  `0`,
  `6`,
  `12`,
  `16`,
  `18`
];

const POSTERS_LIST = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const EMOJI_LIST = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`,
  `trophy.png`
];

const getRandomRating = () => {
  let rating = (Math.round(Math.random() * RATING_MAX) + Math.random()).toFixed(1);
  if (rating > RATING_MAX) {
    rating = RATING_MAX.toString();
  }

  return rating;
};

const getRandomDate = () => {
  return new Date(
      getRandomValue(RELEASE_YEAR_MAX, RELEASE_YEAR_MIN),
      getRandomValue(RELEASE_MONTH_MAX),
      getRandomValue(RELEASE_DAY_MAX));
};

const getRandomRuntime = () => {
  return new Date(0, 0, 0, getRandomValue(RUNNING_TIME_HOURS_MAX, RUNNING_TIME_HOURS_MIN), getRandomValue(RUNNING_TIME_MINUTES_MAX));
};

const getRandomPathToPicture = (path, pictures) => {
  const poster = getRandomArrayItem(pictures);
  return `${path}${poster}`;
};

const getRandomComment = () => {
  return {
    authorName: getRandomUniqueArray(NAMES_LIST, COMMENTATORS_NAME),
    text: getRandomUniqueArray(DESCRIPTIONS_LIST, DESCRIPTION_PARAGRAPH_MAX).join(` `),
    emoji: getRandomPathToPicture(EMOJI_PATH, EMOJI_LIST),
    date: getRandomDate()
  };
};
// Использую тут sort потому-что предполагается, что комменты добавлялись в конец массива, и он приходит с самым свежим комментом в конце.
const getRandomComments = (count) => {
  return new Array(getRandomValue(count)).fill(``).map(getRandomComment).sort((a, b) => a.date - b.date);
};

const getRandomCard = () => {
  return {
    id: getRandomValue(ID_MAX),
    comments: getRandomComments(COMMENTS_MAX),
    filmInfo: {
      title: getRandomArrayItem(FILMS_NAMES),
      alternativeTitle: getRandomArrayItem(FILMS_NAMES),
      totalRating: getRandomRating(),
      poster: getRandomPathToPicture(POSTER_PATH, POSTERS_LIST),
      ageRating: getRandomArrayItem(AGES_RATING),
      director: getRandomUniqueArray(NAMES_LIST, DIRECTORS_MAX),
      writers: getRandomUniqueArray(NAMES_LIST, WRITERS_MAX),
      actors: getRandomUniqueArray(NAMES_LIST, ACTORS_MAX),
      release: {
        date: getRandomDate(),
        releaseCountry: getRandomUniqueArray(COUNTRIES_LIST, COUNTRY_MAX)
      },
      runtime: getRandomRuntime(),
      genre: getRandomUniqueArray(GENRES_LIST, GENRES_MAX),
      description: getRandomUniqueArray(DESCRIPTIONS_LIST, DESCRIPTION_PARAGRAPH_MAX).join(` `),
    },
    userDetails: {
      personalRating: Math.round(getRandomRating()),
      watchlist: getRandomBooleanValue(),
      alreadyWatched: getRandomBooleanValue(),
      watchingDate: getRandomDate(),
      favorite: getRandomBooleanValue()
    },
  };
};

const getRandomCards = (count) => {
  return new Array(count).fill(``).map(getRandomCard);
};

const cards = getRandomCards(CARDS_COUNT);

export {cards};
