const fs = require("fs");

const input = fs.readFileSync("./data/day9.txt", "utf-8").trimEnd().split("\n");

const moveTail = (status, uniqTailPosition) => {
  if (
    Math.abs(status.currentHeadPosition[0] - status.currentTailPosition[0]) <
      2 &&
    Math.abs(status.currentHeadPosition[1] - status.currentTailPosition[1]) < 2
  )
    return;
  status.lastTailPosition = status.currentTailPosition;
  status.currentTailPosition = status.lastHeadPosition;
  uniqTailPosition.add(status.currentTailPosition.join("-"));
};

const moveRight = (status, steps, uniqTailPosition) => {
  for (let index = 0; index < +steps; index++) {
    const currentPosition = status.currentHeadPosition;
    const newHeadPosition = [currentPosition[0], currentPosition[1] + 1];
    status.lastHeadPosition = status.currentHeadPosition;
    status.currentHeadPosition = newHeadPosition;
    moveTail(status, uniqTailPosition);
  }
};
const moveUp = (status, steps, uniqTailPosition) => {
  for (let index = 0; index < +steps; index++) {
    const currentPosition = status.currentHeadPosition;
    const newHeadPosition = [currentPosition[0] - 1, currentPosition[1]];
    status.lastHeadPosition = status.currentHeadPosition;
    status.currentHeadPosition = newHeadPosition;
    moveTail(status, uniqTailPosition);
  }
};
const moveLeft = (status, steps, uniqTailPosition) => {
  for (let index = 0; index < +steps; index++) {
    const currentPosition = status.currentHeadPosition;
    const newHeadPosition = [currentPosition[0], currentPosition[1] - 1];
    status.lastHeadPosition = status.currentHeadPosition;
    status.currentHeadPosition = newHeadPosition;
    moveTail(status, uniqTailPosition);
  }
};
const moveDown = (status, steps, uniqTailPosition) => {
  for (let index = 0; index < +steps; index++) {
    const currentPosition = status.currentHeadPosition;
    const newHeadPosition = [currentPosition[0] + 1, currentPosition[1]];
    status.lastHeadPosition = status.currentHeadPosition;
    status.currentHeadPosition = newHeadPosition;
    moveTail(status, uniqTailPosition);
  }
};

const main = (data) => {
  const status = {
    currentTailPosition: [100, 100],
    lastHeadPosition: null,
    currentHeadPosition: [100, 100],
    lastTailPosition: null,
  };
  const move = {
    R: moveRight,
    U: moveUp,
    L: moveLeft,
    D: moveDown,
  };
  const uniqTailPosition = new Set();
  uniqTailPosition.add(status.currentTailPosition.join("-"));
  data.forEach((instruction) => {
    const [direction, steps] = instruction.split(" ");
    move[direction](status, steps, uniqTailPosition);
  });
  return uniqTailPosition.size;
};

console.log(main(input));
