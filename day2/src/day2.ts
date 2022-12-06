import * as fs from "fs";

const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString().split("\n");

let sum1 = 0;
let sum2 = 0;
for (let line of fileContent) {
    if (
        line.charCodeAt(2) - line.charCodeAt(0) - 23 == 1 ||
        line.charCodeAt(2) - line.charCodeAt(0) - 23 == -2
    ) {
        sum1 += 6;
    } else if (line.charCodeAt(2) - line.charCodeAt(0) - 23 == 0) {
        sum1 += 3;
    }
    sum1 += line.charCodeAt(2) - 87;
}
// A: ROCK B: PAPER C: SCISSOR
for (let line of fileContent) {
    if (line[2] == "Z") {
        sum2 += 6;
        if (line[0] == "C") {
            sum2 += 1;
        } else {
            sum2 += line.charCodeAt(0) - 64 + 1;
        }
    } else if (line[2] == "Y") {
        sum2 += 3;
        sum2 += line.charCodeAt(0) - 64;
    } else {
        if (line[0] == "A") {
            sum2 += 3;
        } else {
            sum2 += line.charCodeAt(0) - 64 - 1;
        }
    }
}

console.log("part 1:", sum1);
console.log("part 2:", sum2);
