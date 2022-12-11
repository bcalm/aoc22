const fs = require("fs");

const input = fs.readFileSync("./data/day11.txt", "utf-8").trimEnd();

const getMonkeys = (input) => {
  return input.split("\n\n").map((instruction) => {
    const [number, items, operation, testParam, trueScenario, falseScenario] =
      instruction.split("\n");
    const monkey = {};
    monkey.number = +number.split(" ")[1].slice(0, 1);
    monkey.items = items.split(":")[1].split(",").map(Number);
    monkey.operation = operation
      .split(":")[1]
      .split("=")[1]
      .split(" ")
      .slice(1);
    monkey.testParam = +testParam.split(":")[1].split(" ")[3];
    monkey.trueScenario = +trueScenario.split(":")[1].split(" ")[4];
    monkey.falseScenario = +falseScenario.split(":")[1].split(" ")[4];
    monkey.inspection = 0;
    return monkey;
  });
};

const main = (input) => {
  const monkeys = getMonkeys(input);
  const calc = {
    "+": (firstNum, secondNum) => firstNum + secondNum,
    "*": (firstNum, secondNum) => firstNum * secondNum,
  };
  const reduceWorryBy = monkeys.reduce(
    (total, current) => total * current.testParam,
    1
  );
  for (let round = 0; round < 10000; round++) {
    for (let monkeyNumber = 0; monkeyNumber < monkeys.length; monkeyNumber++) {
      const monkey = monkeys[monkeyNumber];
      while (monkey.items.length) {
        const currentWorryLevel = monkey.items.shift();
        const operator = calc[monkey.operation[1]];
        const increaseWorryLevel =
          monkey.operation[2] === "old"
            ? currentWorryLevel
            : +monkey.operation[2];
        const newWorryLevel = Math.floor(
          operator(currentWorryLevel, increaseWorryLevel) % reduceWorryBy
        );
        const nextMonkeyNumber =
          newWorryLevel % monkey.testParam === 0
            ? monkey.trueScenario
            : monkey.falseScenario;
        monkeys[nextMonkeyNumber].items.push(newWorryLevel);
        monkey.inspection++;
      }
    }
  }
  return monkeys
    .map((monkey) => monkey.inspection)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((total, current) => total * current);
};

console.log(main(input));
