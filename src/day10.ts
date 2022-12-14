import * as fs from "fs";

const buffer = fs.readFileSync("./src/day10.txt");
const fileContent = buffer.toString().split("\n");

// console.log(fileContent)

let cycles: number[] = [];
cycles[0] = 1;
let tmp = cycles[0];

for (let line of fileContent) {
    const [command, value] = line.split(" ");

    // basis first operation
    cycles.push(tmp);
    if (command == "addx") {
        // second operation if addx
        cycles.push(tmp);

        // set add remainder to next cycle
        tmp += parseInt(value);
    }
}

let signalStrength = 0;
let startingPoint = 20;
let endingPoint = 220;
let freq = 40;

// add signal strength
while (startingPoint <= endingPoint) {
    signalStrength += startingPoint * cycles[startingPoint];
    startingPoint += freq;
}

console.log(signalStrength);
