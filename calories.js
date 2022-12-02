const fs = require("fs");

const input = fs.readFileSync("./data/day1.txt", "utf-8");

const calculateCalories = (data, maxElfCount) => {
  return data
    .split("\n\n")
    .map((calories) =>
      calories
        .split("\n")
        .map((calories) => +calories)
        .reduce((totalCalories, calories) => totalCalories + calories, 0)
    )
    .sort((a, b) => b - a)
    .slice(0, maxElfCount)
    .reduce((totalCalories, elfCalories) => totalCalories + elfCalories, 0);
};

calculateCalories(input, 3);
