const fs = require("fs");

const input = fs.readFileSync("./data/day3.txt", "utf-8");

const findCommonCharacter = (values) => {
  return values[0]
    .split("")
    .filter((character) => values[1].includes(character) && values[2].includes(character));
};

const divideValues = (currentValue) => {
  const size = currentValue.length;
  return [currentValue.slice(0, size / 2), currentValue.slice(size / 2, size)];
};

const main = (data) => {
  const values = data.split("\n");
  const input = [];
  let currentIndex = 0;
  for (let index = 0; index < values.length; index++) {
    if (index % 3 === 0) {
      currentIndex++;
      input[currentIndex] = [];
    }
    input[currentIndex].push(values[index]);
  }
  input.shift();
  return input.reduce((totalPriority, currentValue) => {
    const commonValue = [... new Set(findCommonCharacter(currentValue))]
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
