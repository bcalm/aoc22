const fs = require("fs");

const input = fs.readFileSync("./data/day5.txt", "utf-8");

const parseInstruction = (rawData) => {
  return rawData.split("\n").reduce((instructions, currentInstruction) => {
    const steps = currentInstruction.split(" ");
    instructions.push([+steps[1], +steps[3], +steps[5]]);
    return instructions;
  }, []);
};

const trimWhiteSpaces = (crate) => crate.filter((space) => space !== " ");

const parseCrates = (rawData) => {
  const splittedData = rawData
    .split("\n")
    .slice(0, rawData.split("\n").length - 1);
  const crates = [[], [], [], [], [], [], [], [], []];
  for (let index = 0; index < splittedData.length; index++) {
    const currentData = splittedData[index];
    crates[0].push(currentData[1]);
    crates[1].push(currentData[5]);
    crates[2].push(currentData[9]);
    crates[3].push(currentData[13]);
    crates[4].push(currentData[17]);
    crates[5].push(currentData[21]);
    crates[6].push(currentData[25]);
    crates[7].push(currentData[29]);
    crates[8].push(currentData[33]);
  }
  return crates.map(trimWhiteSpaces);
};

const moveCrates = (crates, instructions) => {
  return instructions.reduce((cratePositions, currentInstruction) => {
    const [count, from, to] = currentInstruction;
    cratePositions[to - 1].unshift(...cratePositions[from - 1].splice(0, count));
    return cratePositions;
  }, crates);
};

const main = (data) => {
  const [crates, instructions] = data.split("\n\n");
  const parsedInstructions = parseInstruction(instructions);
  const parsedCrates = parseCrates(crates);
  return moveCrates(parsedCrates, parsedInstructions).reduce(
    (arrangedCrates, currentCrate) => {
      arrangedCrates.push(currentCrate[0]);
      return arrangedCrates
    },
    []
  ).join('');
};

console.log(main(input));
