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
  const distanceBetweenCrates = 4;
  const rowData = rawData.split("\n");
  const totalCrates = Math.ceil(rowData[0].length / distanceBetweenCrates);
  const crates = new Array(totalCrates).fill(0).map((data) => new Array());
  const data = rowData
    .slice(0, rowData.length - 1)
    .reduce((organizedCrates, currentCrate) => {
      console.log(currentCrate);
      currentCrate.split("").forEach((element, currIndex) => {
        if (!["[", " ", "]"].includes(element)) {
          const crateToAdd = Math.round(currIndex / distanceBetweenCrates);
          console.log(crateToAdd);
          organizedCrates[crateToAdd].push(element);
        }
      });
      return organizedCrates;
    }, crates);
  console.log(data);
  return data;
};

const moveCrates = (crates, instructions) => {
  return instructions.reduce((cratePositions, currentInstruction) => {
    const [count, from, to] = currentInstruction;
    cratePositions[to - 1].unshift(
      ...cratePositions[from - 1].splice(0, count)
    );
    return cratePositions;
  }, crates);
};

const main = (data) => {
  const [crates, instructions] = data.split("\n\n");
  const parsedInstructions = parseInstruction(instructions);
  const parsedCrates = parseCrates(crates);
  return moveCrates(parsedCrates, parsedInstructions)
    .reduce((arrangedCrates, currentCrate) => {
      arrangedCrates.push(currentCrate[0]);
      return arrangedCrates;
    }, [])
    .join("");
};

console.log(main(input));
