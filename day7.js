const { dir } = require("console");
const fs = require("fs");

const input = fs.readFileSync("./data/day7.txt", "utf-8");

const calculateEachDirectorySize = (directories, directory, root) => {
  const children = root[directory].child;
  children.forEach((child) => {
    if (root.child) {
      calculateEachDirectorySize(directories, child, root);
    }
    root[directory].size += +root[child].size;
  });
};

const calculateDirectoriesSize = (directories, root) => {
  directories.forEach((directory) => {
    calculateEachDirectorySize(directories, directory, root);
  });
  directories.forEach((directory) => {
    root[directory].child
      .filter((c) => directories.includes(c))
      .forEach((c) => {
        root[directory].size += root[c].size;
      });
  });
};

const filterDirectories = (root) => {
  return Object.values(root)
    .filter((data) => data.child && data.child.length)
    .map((data) => data.name);
};

const calculateDirectoriesTotalSize = (directories, root) => {
    return Object.values(root)
      .filter((dir) => dir.size <= 100000)
      .reduce((acc, dir) => acc + +dir.size, 0)

}

const handleCd = (directoryMap, instruction) => {
  directoryMap.pwd =
    instruction.split(" ")[2] === ".."
      ? directoryMap[directoryMap.pwd].parent
      : instruction.split(" ")[2];
  return directoryMap;
};

const handleListOutput = (directoryMap, instruction) => {
  const currentDirectory = directoryMap.pwd;
  const child = directoryMap[currentDirectory].child;
  const [size, name] = instruction.split(" ");
  child.push(name);
  if (instruction.startsWith("dir")) {
    directoryMap[name] = {
      name: instruction.split(" ")[1],
      child: [],
      parent: currentDirectory,
      size: 0,
    };
  } else {
    directoryMap[name] = {
      name,
      child: [],
      parent: currentDirectory,
      size,
    };
  }
};

const main = (data) => {
  const directoryStructure = {
    pwd: "/",
    "/": { name: "/", child: [], parent: null, size: 0 },
  };
  const root = data
    .split("\n")
    .slice(1, data.split("\n").length)
    .reduce((directoryMap, instruction) => {
      if (instruction.startsWith("$ cd")) {
        handleCd(directoryMap, instruction);
      }
      if (!instruction.startsWith("$")) {
        handleListOutput(directoryMap, instruction);
      }
      return directoryMap;
    }, directoryStructure);
  const directories = filterDirectories(root);
  calculateDirectoriesSize(directories, root);
  return calculateDirectoriesTotalSize(directories, root);
};

console.log(main(input), "last");
