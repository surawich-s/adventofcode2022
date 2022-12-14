import * as fs from "fs";

const buffer = fs.readFileSync("./src/day10.txt");
const fileContent = buffer.toString().split("\n");

const cycles = plot(fileContent);
console.log("part 1:", signalStrength(cycles));
drawCrt(cycles);

function plot(fileContent: string[]) {
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

    return cycles;
}

function signalStrength(cycles: number[]) {
    let signalStrength = 0;
    let startingPoint = 20;
    let endingPoint = 220;
    let freq = 40;

    // add signal strength
    while (startingPoint <= endingPoint) {
        signalStrength += startingPoint * cycles[startingPoint];
        startingPoint += freq;
    }

    return signalStrength;
}

function drawCrt(cycles: number[]) {
    let sprite_pos = 1;
    for (let i = 0; i <= 200; i += 40) {
        let draw = "";
        for (let j = 1; j <= 40; j++) {
            sprite_pos = cycles[i + j];
            // check if it in certain position
            if (j - 1 >= sprite_pos - 1 && j - 1 <= sprite_pos + 1) {
                draw += "#";
            } else {
                draw += ".";
            }
        }
        console.log(draw);
    }
}
