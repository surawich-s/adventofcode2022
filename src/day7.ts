import { hasSubscribers } from "diagnostics_channel";
import * as fs from "fs";

const buffer = fs.readFileSync("./src/day7.txt");
const fileContent = buffer.toString().split("\n");

// console.log(fileContent);

type Directories = {
    name: string;
    totalSize: number;
    size: number;
    subs: string[];
};

const directories: Directories = {
    name: "/",
    totalSize: 0,
    size: 0,
    subs: [],
};

// console.log("part 1:", findMarker(fileContent));
// console.log("part 2:", findMessage(fileContent));
let where = "";

function mkDir(name: string) {}

for (let line of fileContent) {
    const lineEl = line.split(" ");
    if (lineEl[0] == "$") {
        if (lineEl[1] == "cd") {
            if (lineEl[2] !== ".." && lineEl[2] !== "/") {
                where = lineEl[2];
            }
        }
    } else if (lineEl[0] == "dir") {
        directories.subs.push(lineEl[1]);
    } else if (!isNaN(parseInt(lineEl[0]))) {
        directories.size += parseInt(lineEl[0]);
    }
}

console.log(directories);
