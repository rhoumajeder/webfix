const objectInArray = (arr, attr, value) => {
  let found = false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][attr] === value) {
      found = true;
      break;
    }
  }

  return found;
};

export default objectInArray;
