import * as fs from "fs";

const buffer = fs.readFileSync("./src/day4.txt");
const fileContent = buffer.toString().split("\n");

console.log("part 1:", fullyContain(fileContent));
console.log("part 2:", overlap(fileContent));

function fullyContain(fileContent: string[]) {
    let count = 0;
    for (let line of fileContent) {
        let [first, second] = line.split(",");
        // console.log(first, second);
        let [lowOfFirst, highOfFirst] = first.split("-");
        // console.log(lowOfFirst, highOfFirst);
        let [lowOfSecond, highOfSecond] = second.split("-");

        if (
            (parseInt(lowOfFirst) >= parseInt(lowOfSecond) &&
                parseInt(highOfFirst) <= parseInt(highOfSecond)) ||
            (parseInt(lowOfSecond) >= parseInt(lowOfFirst) &&
                parseInt(highOfSecond) <= parseInt(highOfFirst))
        ) {
            // console.log(line);
            count++;
        }
    }
    return count;
}

function overlap(fileContent: string[]) {
    let count = 0;
    for (let line of fileContent) {
        let [first, second] = line.split(",");
        // console.log(first, second);
        let [lowOfFirst, highOfFirst] = first.split("-");
        // console.log(lowOfFirst, highOfFirst);
        let [lowOfSecond, highOfSecond] = second.split("-");

        if (
            !(
                parseInt(highOfFirst) < parseInt(lowOfSecond) ||
                parseInt(highOfFirst) > parseInt(highOfSecond)
            ) ||
            !(
                parseInt(highOfSecond) < parseInt(lowOfFirst) ||
                parseInt(highOfSecond) > parseInt(highOfFirst)
            )
        ) {
            // console.log(line);
            count++;
        }
    }
    return count;
}
