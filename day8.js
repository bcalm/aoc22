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

const calculateView = (array, value, index = 0) => {
    if (index === array.length) return index;
    if (array[index] > value) return index + 1;
    if (array[index] === value) return index + 1;
    return calculateView(array, value, index + 1);
};

const calculateScenicScore = (
    rows,
    columns,
    treeValue,
    position
) => {
    const [rowPosition, columnPosition] = position
        .split("-")
        .map((position) => +position);
    if (isInEdge(rowPosition, columnPosition, input.length)) return 0;
    const up = columns[columnPosition].slice(0, rowPosition);
    const down = columns[columnPosition].slice(rowPosition + 1, input.length);
    const left = rows[rowPosition].slice(0, columnPosition);
    const right = rows[rowPosition].slice(columnPosition + 1, input.length);
    const upView = calculateView(up.reverse(), treeValue);
    const downView = calculateView(down, treeValue);
    const leftView = calculateView(left.reverse(), treeValue);
    const rightView = calculateView(right, treeValue);
    return upView * downView * leftView * rightView;
};

function calculateAllTreesScenicViews(treeMap, rows, columns) {
    return Object.keys(treeMap).map((position) => calculateScenicScore(
            rows,
            columns,
            treeMap[position],
            position
        )
    );
}

function getTreeMap(data) {
    const treeMap = {};
    const rows = new Array(input.length).fill(0).map(() => []);
    const columns = new Array(input.length).fill(0).map(() => []);
    for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
        const row = data[rowIndex];
        const trees = row.split("");
        for (let columnIndex = 0; columnIndex < input.length; columnIndex++) {
            const tree = +trees[columnIndex];
            rows[rowIndex].push(tree);
            columns[columnIndex].push(tree);
            treeMap[`${rowIndex}-${columnIndex}`] = tree;
        }
    }
    return {treeMap, rows, columns};
}

const main = (data) => {
    const {treeMap, rows, columns} = getTreeMap(data);
    return Math.max(...calculateAllTreesScenicViews(treeMap, rows, columns));
};

console.log(main(input));
