const fs = require("fs");

const input = fs.readFileSync("./data/day2.txt", "utf-8");

const loss = (elfMove) => {
  const value = {
    A: 3,
    B: 1,
    C: 2,
  };
  return value[elfMove];
};

const win = (elfMove) => {
  const value = {
    A: 2,
    B: 3,
    C: 1,
  };
  return value[elfMove] + 6;
};

const draw = (elfMove) => {
  const value = {
    A: 1,
    B: 2,
    C: 3,
  };
  return value[elfMove] + 3;
};

const main = (input) => {
  const instructons = {
    A: 1,
    B: 2,
    C: 3,
    Y: draw,
    Z: win,
    X: loss,
  };

  return input.split("\n").reduce((totalValue, moves) => {
    const [elfMove, myMove] = moves.split(" ");
    return totalValue + instructons[myMove](elfMove);
  }, 0);
};

console.log(main(input));
