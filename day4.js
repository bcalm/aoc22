const fs = require("fs");

const input = fs.readFileSync("./data/day4.txt", "utf-8");

const range = (start, end) => {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
};

const getRange = (positons) => {
  const [firstNumber, secondNumber] = positons.split("-");
  return range(+firstNumber, +secondNumber);
};

function findCommonElements(range1, range2) {
  return range1.some((item) => range2.includes(item));
}

const main = (data) => {
  return data.split("\n").reduce((reconsiderationValue, currentInstruction) => {
    const [firstElfPositions, secondElfPositions] =
      currentInstruction.split(",");
    const firstElfRange = getRange(firstElfPositions);
    const secondElfRange = getRange(secondElfPositions);
    const value = findCommonElements(firstElfRange, secondElfRange);
    return reconsiderationValue + value;
  }, 0);
};

console.log(main(input));
