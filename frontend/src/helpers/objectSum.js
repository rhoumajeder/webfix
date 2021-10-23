const objectSum = (items, prop) => {
  return items.reduce((a, b) => {
    return a + b[prop];
  }, 0);
};

export default objectSum;
