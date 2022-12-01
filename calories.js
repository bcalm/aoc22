const fs = require("fs");

const input = fs.readFileSync("./data/day1.txt", "utf-8");

const calculateCalories = (data, maxElfCount) => {
  return getEachElfCalories(data)
    .map(calculateCalorieForEachElf)
    .sort((a, b) => b - a)
    .slice(0, maxElfCount)
    .reduce(countCalories, 0);
};

const getEachElfCalories = (data) => data.split("\n\n");

const calculateCalorieForEachElf = (calories) =>
  convertCaloriesToNumber(calories).reduce(
    (totalCalories, calories) => totalCalories + calories,
    0
  );

const convertCaloriesToNumber = (calories) =>
  calories.split("\n").map((calories) => +calories);

const countCalories = (totalCalories, elfCalories) =>
  totalCalories + elfCalories;

console.log(calculateCalories(input, 1));
