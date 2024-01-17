const firstLetterToUppercase = (str) => {
  if (str === undefined) return;
  return str[0]?.toUpperCase() + str?.slice(1);
};

export default firstLetterToUppercase;
