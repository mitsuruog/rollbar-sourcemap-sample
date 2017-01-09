const calc = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
    return index * 2;
  }).reduce((a, b) => {
    return a + b;
  });
};

console.log(calc());
