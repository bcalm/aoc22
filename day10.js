const fs = require("fs");

const input = fs.readFileSync("./data/day10.txt", "utf-8").trimEnd();

const main = (input) => {
  const instructions = input
    .split("\n")
    .map((data) => data.split(" "))
    .map((data) => [data[0], Number(data[1])]);
  let currentValue = 1;
  let currentCycle = 1;
  const cyleValues = {};
  instructions.forEach((instruction) => {
    const [command, value] = instruction;
    if (command === "noop") {
      currentCycle++;
      cyleValues[currentCycle] = currentValue;
    } else {
      currentCycle++;
      cyleValues[currentCycle] = currentValue;
      currentCycle++;
      currentValue += value;
      cyleValues[currentCycle] = currentValue;
    }
  });
  console.log(
    cyleValues[20],
    cyleValues[60],
    cyleValues[100],
    cyleValues[140],
    cyleValues[180],
    cyleValues[220]
  );
  return (
    cyleValues[20] * 20 +
    cyleValues[60] * 60 +
    cyleValues[100] * 100 +
    cyleValues[140] * 140 +
    cyleValues[180] * 180 +
    cyleValues[220] * 220
  );
  // );
};

console.log(main(input));
