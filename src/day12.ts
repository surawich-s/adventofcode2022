import * as fs from "fs";

const buffer = fs.readFileSync("./src/day12.txt");
const fileContent = buffer.toString().trim().split("\n");

let startingPoint: number[] = [];
const map = fileContent.map((line) => {
    const arrayLine = line.split("");
    arrayLine.map((char) => {
        if (char == "S") {
            startingPoint = [fileContent.indexOf(line), arrayLine.indexOf("S")];
        }
    });
    return arrayLine.map((char) => {
        return char.charCodeAt(0);
    });
});

console.log(startingPoint);

let step = 0;
