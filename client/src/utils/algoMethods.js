export const makeFirstLetterCapital = (string) => {
  const term = string.toLowerCase().trim();
  return term.charAt(0).toUpperCase() + term.slice(1);
};

export const makeEveryFirstLetterCapital = (text) => {
  const term = text.toLowerCase().trim();
  const splitText = term.split(" ");

  for (let i = 0; i < splitText.length; i++) {
    splitText[i] = splitText[i].charAt(0).toUpperCase() + splitText[i].slice(1);
  }

  return splitText.join(" ");
};

export function randomNumBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function sortArrayOfObject(array, key) {
  return [
    ...array.sort((a, b) => {
      if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
      if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
      return 0;
    }),
  ];
}

export function sortReverseArrayOfObject(array, key) {
  return [
    ...array.sort((a, b) => {
      if (a[key].toLowerCase() > b[key].toLowerCase()) return -1;
      if (a[key].toLowerCase() < b[key].toLowerCase()) return 1;
      return 0;
    }),
  ];
}

export const filterArrayOfObjectsByTerm = (term, array, key) => {
  const searchTerm = term.trim();
  const arrayFiltered = array.filter((object) => {
    return object[key].toLowerCase().includes(searchTerm.toLowerCase());
  });
  return arrayFiltered;
};

export const generateUniqNumber = (array, key) => {
  const random = randomNumBetween(1_000_000, 9_999_999);
  const item = array.findIndex((item) => item[key] === random);
  if (item === -1) return random;
  generateUniqNumber(array, key);
};
