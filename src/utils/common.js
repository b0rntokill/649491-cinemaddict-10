import moment from 'moment';

const commentsTimeFormat = (date) => {
  return moment(date).format(`MM/D/YYYY h:mm`);
};

const releaseTimeFormat = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const getRuntimeHours = (runtime) => {
  return moment(runtime).format(`hh mm`);
};

const getCommaSeparatedLine = (array) => {
  return array.join(`, `);
};

const getRandomValue = (max, min = 0) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomArrayItem = (array) => {
  return shuffleArray(array)[0];
};

const getRandomBooleanValue = () => {
  return Math.random() > 0.5;
};

const getRandomUniqueArray = (array, max, min = 0) => {
  return shuffleArray(array).slice(min, getRandomValue(max, 1));
};

// Перемешиванние массива алгоритмом Фишера-Йетса
const shuffleArray = (array) => {
  let j;
  const [...newArray] = array;
  for (let i = newArray.length - 1; i > 0; i--) {
    j = getRandomValue(i);
    [newArray[j], newArray[i]] = [newArray[i], newArray[j]];
  }

  return newArray;
};

export {
  commentsTimeFormat,
  releaseTimeFormat,
  getRuntimeHours,
  getCommaSeparatedLine,
  shuffleArray,
  getRandomValue,
  getRandomArrayItem,
  getRandomBooleanValue,
  getRandomUniqueArray
};
