const { Cipher } = require("crypto");
const fs = require("fs");

const input = fs.readFileSync("./data/day8.txt", "utf-8").split("\n");

const isInEdge = (rowPosition, columnPosition, totalLength) => {
  return (
    rowPosition === 0 ||
    columnPosition === 0 ||
    rowPosition === totalLength ||
    columnPosition === totalLength
  );
};

const isTallest = (rows, columns, treeValue, rowPosition, columnPosition) => {
  const leftPart = columns[columnPosition].slice(0, rowPosition);
  const rightPart = columns[columnPosition].slice(rowPosition + 1, 99);
  const leftColumnMaxValue = Math.max(...leftPart);
  const rightColumnMaxValue = Math.max(...rightPart);
  const leftPartRow = rows[rowPosition].slice(0, columnPosition);
  const rightPartRow = rows[rowPosition].slice(columnPosition + 1, 99);
  const leftRowMaxValue = Math.max(...leftPartRow);
  const rightRowMaxValue = Math.max(...rightPartRow);
  return (
    treeValue > leftColumnMaxValue ||
    treeValue > rightColumnMaxValue ||
    treeValue > leftRowMaxValue ||
    treeValue > rightRowMaxValue
  );
};

const main = (data) => {
  const treeMap = {};
  const totalLength = data.length;
  const rows = new Array(totalLength).fill(0).map((data) => new Array());
  const columns = new Array(totalLength).fill(0).map((data) => new Array());
  for (let rowIndex = 0; rowIndex < totalLength; rowIndex++) {
    const row = data[rowIndex];
    const trees = row.split("");
    for (let columnIndex = 0; columnIndex < totalLength; columnIndex++) {
      const tree = +trees[columnIndex];
      rows[rowIndex].push(tree);
      columns[columnIndex].push(tree);
      treeMap[`${rowIndex}-${columnIndex}`] = tree;
    }
  }
  return Object.keys(treeMap).filter((position) => {
    const [rowPosition, columnPosition] = position
      .split("-")
      .map((position) => +position);
    return (
      isInEdge(rowPosition, columnPosition, totalLength - 1) ||
      isTallest(rows, columns, treeMap[position], rowPosition, columnPosition)
    );
  }).length;
};

console.log(main(input));
