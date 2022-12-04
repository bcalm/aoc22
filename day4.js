const fs = require("fs");

const input = fs.readFileSync("./data/day4.txt", "utf-8");

const getRange = (positons) => {
  return positons.split("-");
};

const isContainingAllNumbers = (range1, range2) => {
    console.log(range1, range2, +range1[0] >= +range2[0] && +range1[1] <= +range2[1])
  return +range1[0] >= +range2[0] && +range1[1] <= +range2[1];
};

const checkReconsideration = (firstElfRange, secondElfRange) => {
  return (
    isContainingAllNumbers(firstElfRange, secondElfRange) ||
    isContainingAllNumbers(secondElfRange, firstElfRange)
  );
};

const main = (data) => {
  return data.split("\n").reduce((reconsiderationValue, currentInstruction) => {
    const [firstElfPositions, secondElfPositions] =
      currentInstruction.split(",");
    const firstElfRange = getRange(firstElfPositions);
    const secondElfRange = getRange(secondElfPositions);
    return (
      reconsiderationValue + checkReconsideration(firstElfRange, secondElfRange)
    );
  }, 0);
};

console.log(main(input));
