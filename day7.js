const { dir } = require("console");
const fs = require("fs");

// part 1 1307902
// part 2 7068748

const input = fs.readFileSync("./data/day7.txt", "utf-8").trimEnd();

const getNodes = (instructions) => {
  let currentId = 0;
  const root = [
    { name: "/", type: "dir", size: 0, parent: null, id: currentId },
  ];
  const directoryIdMap = { "/": 0 };
  for (
    let instructionIndex = 1;
    instructionIndex < instructions.length;
    instructionIndex++
  ) {
    const [command, instruction] = instructions[instructionIndex].split(" ");
    if (command.startsWith("ls")) continue;
    if (command.startsWith("cd")) {
      currentId =
        instruction === ".."
          ? directoryIdMap[root[currentId].parent]
          : directoryIdMap[instruction];
      continue;
    }
    if (command === "dir") {
      root.push({
        name: instruction,
        type: "dir",
        size: 0,
        parent: root[currentId].name,
        id: root.length,
      });
      directoryIdMap[instruction] = root.length - 1;
    } else {
      root.push({
        name: instruction,
        type: "file",
        size: +command,
        parent: root[currentId].name,
        id: root.length,
      });
    }
  }
  return [root, directoryIdMap];
};



const main = (data) => {
  const instructions = data
    .split("\n")
    .map((instruction) => instruction.replace("$ ", ""));
  const [nodes, directoryIdMap] = getNodes(instructions);
  console.log(nodes, directoryIdMap)
  return nodes
    .filter((node) => node.size < 100000 && node.type === "dir")
    .reduce((total, node) => {
      return (total += node.size);
    }, 0);
};

console.log(main(input));
