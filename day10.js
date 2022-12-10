const fs = require("fs");

const input = fs.readFileSync("./data/day10.txt", "utf-8").trimEnd();

const main = (input) => {
  const instructions = input
    .split("\n")
    .map((data) => data.split(" "))
    .map((data) => [data[0], Number(data[1])]);
  let currentValue = 1;
  let currentCycle = 1;
  let registerPositions = [currentValue, currentValue + 1, currentValue + 2];
  let map = "";
  instructions.forEach((instruction) => {
    const [command, value] = instruction;
    if (command === "noop") {
      map += registerPositions.includes(currentCycle % 40) ? "#" : " ";
      currentCycle++;
    } else {
      map += registerPositions.includes(currentCycle % 40) ? "#" : " ";
      currentCycle++;
      map += registerPositions.includes(currentCycle % 40) ? "#" : " ";
      currentCycle++;
      currentValue += value;
      registerPositions = [currentValue, currentValue + 1, currentValue + 2];
    }
  });
  for (let index = 0; index < 241; index += 40) {
    console.log(map.slice(index, index + 40));
  }
};

main(input);
