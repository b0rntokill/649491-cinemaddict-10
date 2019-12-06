const HOUR_IN_MINUTES = 60;

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getRuntimeHours = (runtime) => {
  const hours = `${Math.trunc(runtime / 60)}h`;
  const minutes = `${runtime % HOUR_IN_MINUTES}m`;
  return `${hours} ${minutes}`;
};

const getCommaSeparatedLine = (array) => {
  return array.join(`, `);
};

const renderTemplate = (container, template, where = `beforeend`) => {
  container.insertAdjacentHTML(where, template);
};
// Разобраться надо бы
const getSortArrayFromLarger = (array, property) => {
  return array.slice().sort((a, b) => b[property] - a[property]);
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

const getRandomUniqueArray = (array, max = array.length, min = 0) => {
  return shuffleArray(array).slice(min, max);
};

// Перемешиванние массива алгоритмом Фишера-Йетса
const shuffleArray = (array) => {
  let j;
  let [...newArray] = array;
  for (let i = newArray.length - 1; i > 0; i--) {
    j = getRandomValue(i);
    [newArray[j], newArray[i]] = [newArray[i], newArray[j]];
  }

  return newArray;
};


export {castTimeFormat, getRuntimeHours, getCommaSeparatedLine, renderTemplate, getSortArrayFromLarger, shuffleArray, getRandomValue, getRandomArrayItem, getRandomBooleanValue, getRandomUniqueArray};
