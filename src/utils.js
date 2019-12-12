const HOUR_IN_MINUTES = 60;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

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


export {castTimeFormat,
  getRuntimeHours,
  getCommaSeparatedLine,
  shuffleArray,
  getRandomValue,
  getRandomArrayItem,
  getRandomBooleanValue,
  getRandomUniqueArray,
  renderElement,
  createElement,
  RenderPosition
};
