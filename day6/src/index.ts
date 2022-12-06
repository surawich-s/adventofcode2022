import * as fs from "fs";

const buffer = fs.readFileSync("./src/input.txt");
const fileContent = buffer.toString().split("");

// console.log(fileContent);

console.log("part 1:", findMarker(fileContent));
console.log("part 2:", findMessage(fileContent));

function findMarker(fileContent: string[]) {
    let tmp: string[] = [];
    let result = 0;
    for (let i = 0; i < fileContent.length; i++) {
        for (let j = i; j < i + 4; j++) {
            if (tmp.includes(fileContent[j])) {
                tmp = [];
                break;
            } else {
                tmp.push(fileContent[j]);
            }

            if (j == i + 3) {
                result = j + 1;
                break;
            }
        }
        if (result) {
            return result;
        }
    }
}
function findMessage(fileContent: string[]) {
    let tmp: string[] = [];
    let result = 0;
    for (let i = 0; i < fileContent.length; i++) {
        for (let j = i; j < i + 14; j++) {
            if (tmp.includes(fileContent[j])) {
                tmp = [];
                break;
            } else {
                tmp.push(fileContent[j]);
            }

            if (j == i + 13) {
                result = j + 1;
                break;
            }
        }
        if (result) {
            return result;
        }
    }
}
