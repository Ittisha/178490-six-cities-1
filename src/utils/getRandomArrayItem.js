export const getRandomArrayItem = (initialArray) => {
  const randomIndex = Math.floor(Math.random() * initialArray.length);
  return initialArray[randomIndex];
};
