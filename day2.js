const fs = require("fs");

const input = fs.readFileSync("./data/day2.txt", "utf-8");

const loss = (totalValue, moveValue, elfMove) =>
  ["C", "B"].includes(elfMove) ? totalValue + moveValue - 1 : totalValue + 3;

const win = (totalValue, moveValue, elfMove) =>
  ["A", "B"].includes(elfMove)
    ? totalValue + moveValue + 1 + 6
    : totalValue + moveValue + 1;

const draw = (totalValue, moveValue, elfMove) => totalValue + moveValue + 3;

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
    const elfMoveValue = instructons[elfMove];
    return instructons[myMove](totalValue, elfMoveValue, elfMove);
  }, 0);
};

console.log(main(input));
