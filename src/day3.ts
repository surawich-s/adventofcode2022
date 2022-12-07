import * as fs from "fs";

const buffer = fs.readFileSync("./src/day3.txt");
const fileContent = buffer.toString().split("\n");

console.log("part 1:", sumPart1(fileContent));
console.log("part 2:", sumPart2(fileContent));

function sumPart1(fileContent: string[]) {
    let hashMap: number[] = [];
    let sum = 0;
    for (let line of fileContent) {
        let middle = line.length / 2;
        let first = line.substring(0, middle).split("");
        let last = line.substring(middle).split("");
        // console.log(line.substring(0, middle), line.substring(middle));
        for (let i = 0; i < first.length; i++) {
            if (!hashMap[first[i].charCodeAt(0)]) {
                hashMap[first[i].charCodeAt(0)] = 1;
            }
        }
        for (let i = 0; i < last.length; i++) {
            if (hashMap[last[i].charCodeAt(0)] == 1) {
                // console.log(last[i]);
                if (last[i].charCodeAt(0) > 96) {
                    sum += last[i].charCodeAt(0) - 96;
                } else {
                    sum += last[i].charCodeAt(0) - 64 + 26;
                }
                // console.log(sum1);
                hashMap = [];
                break;
            }
        }
    }

    return sum;
}

function sumPart2(fileContent: string[]) {
    let hashMap: number[] = [];
    let sum = 0;
    let count = 1;
    for (let line of fileContent) {
        for (let i = 0; i < line.length; i++) {
            if (!hashMap[line[i].charCodeAt(0)] && count == 1) {
                hashMap[line[i].charCodeAt(0)] = 1;
            } else if (hashMap[line[i].charCodeAt(0)] == 1 && count == 2) {
                hashMap[line[i].charCodeAt(0)] = 2;
            } else if (hashMap[line[i].charCodeAt(0)] == 2 && count == 3) {
                // console.log(line[i]);
                if (line[i].charCodeAt(0) > 96) {
                    sum += line[i].charCodeAt(0) - 96;
                } else {
                    sum += line[i].charCodeAt(0) - 64 + 26;
                }
                // console.log(sum);
                hashMap = [];
                break;
            }
        }
        count++;
        if (count > 3) {
            count = 1;
        }
    }

    return sum;
}
