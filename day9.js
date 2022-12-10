const fs = require("fs");

const input = fs.readFileSync("./data/day9.txt", "utf-8").trimEnd();

const main = (input) => {
  const moves = input.split("\n").map((line) => {
    let [direction, number] = line.split(" ");
    return { direction, number: parseInt(number) };
  });

  const body = new Array(10).fill(0).map((element) => {
    return { x: 0, y: 0 };
  });

  const direction = {
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 },
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
  };

  const positions = new Set();
  positions.add(`${body[body.length - 1].x}-${body[body.length - 1].y}`);
  moves.forEach((move) => {
    for (let step = 0; step < move.number; step++) {
      body[0].x += direction[move.direction].x;
      body[0].y += direction[move.direction].y;

      for (let i = 1; i < body.length; i++) {
        const distX = body[i - 1].x - body[i].x;
        const distY = body[i - 1].y - body[i].y;

        if (Math.abs(distX) >= 2) {
          body[i].x += Math.sign(distX);
          if (Math.abs(distY) != 0) body[i].y += Math.sign(distY);
        } else if (Math.abs(distY) >= 2) {
          body[i].y += Math.sign(distY);
          if (Math.abs(distX) != 0) body[i].x += Math.sign(distX);
        }
      }

      positions.add(`${body[body.length - 1].x}-${body[body.length - 1].y}`);
    }
  });

  return positions.size;
};

console.log(main(input));
