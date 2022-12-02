const fs = require("fs");

const input = fs.readFileSync("./data/day2.txt", "utf-8");

const main = (input) => {
  const rock = ["A", "X"];
  const paper = ["B", "Y"];
  const scissor = ["C", "Z"];
  const valueChart = {
    X: 1,
    Y: 2,
    Z: 3,
    A: 1,
    B: 2,
    C: 3,
  };

  return input.split("\n").reduce((con, ele) => {
    const [elfMove, myMove] = ele.split(" ");
    if (valueChart[elfMove] === valueChart[myMove]) {
      return con + valueChart[myMove] + 3;
    }
    con += valueChart[myMove];
    if (rock.includes(elfMove) && paper.includes(myMove)) {
      con += 6;
    }
    if (paper.includes(elfMove) && scissor.includes(myMove)) {
      con += 6;
    }
    if (scissor.includes(elfMove) && rock.includes(myMove)) {
      con += 6;
    }
    return con;
  }, 0);
};

console.log(main(input));
