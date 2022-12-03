const fs = require("fs");

const input = fs.readFileSync("./data/day3.txt", "utf-8");

const findCommonCharacter = (firstValue, secondValue) => {
  return firstValue
    .split("")
    .filter((character) => secondValue.includes(character));
};

const divideValues = (currentValue) => {
  const size = currentValue.length;
  return [currentValue.slice(0, size / 2), currentValue.slice(size / 2, size)];
};

const main = (data) => {
  return data.split("\n").reduce((totalPriority, currentValue) => {
    const [firstHalf, secondHalf] = divideValues(currentValue);
    const commonValue = [
      ...new Set(findCommonCharacter(firstHalf, secondHalf)),
    ];
    const value = commonValue.reduce((totalvalue, cur) => {
      const commonValue1 = cur.charCodeAt(0);
      return commonValue1 < 91
        ? totalvalue + commonValue1 - 38
        : totalvalue + commonValue1 - 96;
    }, 0);
    return totalPriority + value;
  }, 0);
};

console.log(main(input));
