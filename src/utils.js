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
// Перемешиванние массива алгоритмом Фишера-Йетса
const shuffleArray = (array) => {
  let j;
  let temp;
  let newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i));
    temp = newArray[j];
    newArray[j] = newArray[i];
    newArray[i] = temp;
  }

  return newArray;
};

export {castTimeFormat, getRuntimeHours, getCommaSeparatedLine, renderTemplate, getSortArrayFromLarger, shuffleArray};
