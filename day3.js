const fs = require("fs");

const input = fs.readFileSync("./data/day3.txt", "utf-8");

const findCommonCharacterASCIIValue = (values) => {
  const [firstBox, secondBox, thirdBox] = [...values];
  return firstBox
    .split("")
    .find(
      (character) =>
        secondBox.includes(character) && thirdBox.includes(character)
    )
    .charCodeAt(0);
};

const divideArray = (myArray, chunk_size) => {
  var results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }
  return results;
};

const main = (data) => {
  const elfBoxes = divideArray(data.split("\n"), 3);
  return elfBoxes.reduce((totalPriorityValue, currentCharacter) => {
    const characterASCIIValue = findCommonCharacterASCIIValue(currentCharacter);
    const characterValue =
      characterASCIIValue < 91
        ? characterASCIIValue - 38
        : characterASCIIValue - 96;
    return totalPriorityValue + characterValue;
  }, 0);
};

console.log(main(input));
