const objectSum = (items, prop) => {
  return items.reduce((a, b) => {
    return Number(a) + Number(b[prop]);
  }, 0);
};

export default objectSum;
