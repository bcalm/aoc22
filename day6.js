const fs = require("fs");

const input = fs.readFileSync("./data/day6.txt", "utf-8");

const main = (data) => {
  const splittedData = data.split("");
  for (let index = 0; index < splittedData.length; index++) {
    const fourCharacters = splittedData.slice(index, index + 14);
    const uniqCharacters = [...new Set(fourCharacters)];
    if (uniqCharacters.length === 14) {
        return index + 14;
    }
  }
};

console.log(main(input));
