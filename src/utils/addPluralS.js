export const addPluralS = (number, noun, suffix = `s`) =>
  `${noun}${number !== 1 ? suffix : ``}`;
