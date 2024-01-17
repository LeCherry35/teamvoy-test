const addZeroes = (str) => {
  str = String(str);
  while (str.length < 3) {
    str = "0" + str;
  }
  return str;
};
export default addZeroes;
