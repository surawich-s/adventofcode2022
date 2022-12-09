import * as fs from "fs";

const buffer = fs.readFileSync("./src/day8.txt");
const fileContent = buffer.toString().split("\n");

// console.log(fileContent);

// construct 2d array of numbers
let arr: number[][] = [];
for (let i = 0; i < fileContent.length; i++) {
    const parseIntLine = fileContent[i].split("").map((item) => parseInt(item));
    arr.push(parseIntLine);
}

const xLength = arr[0].length;
const yLength = arr.length;

let result: number[][] = [];

for (let i = 0; i < yLength; i++) {
    result[i] = [];
    for (let j = 0; j < xLength; j++) {
        // If we are on the first or last row, or the first or last column, set the value to 1
        if (i === 0 || i === yLength - 1 || j === 0 || j === xLength - 1) {
            result[i][j] = 1;
        } else {
            result[i][j] = 0;
        }
    }
}

// X AXIS
for (let i = 1; i < yLength - 1; i++) {
    let leftGuard = arr[i][0];
    let rightGuard = arr[i][xLength - 1];

    // from left to right

    for (let j = 1; j < xLength - 2; j++) {
        if (arr[i][j] > leftGuard) {
            result[i][j] = 1;
            leftGuard = arr[i][j];
        }
    }

    // from right to left

    for (let j = xLength - 2; j > 1; j--) {
        if (arr[i][j] > rightGuard) {
            result[i][j] = 1;
            rightGuard = arr[i][j];
        }
    }
}

// Y AXIS
for (let j = 1; j < xLength - 1; j++) {
    let topGuard = arr[0][j];
    let bottomGuard = arr[yLength - 1][j];
    // Top to Bottom
    for (let i = 1; i < yLength - 2; i++) {
        if (arr[i][j] > topGuard) {
            result[i][j] = 1;
            topGuard = arr[i][j];
        }
    }

    for (let i = yLength - 2; i > 1; i--) {
        if (arr[i][j] > bottomGuard) {
            result[i][j] = 1;
            bottomGuard = arr[i][j];
        }
    }
}

console.log(
    result.map((list) => list.reduce((a, b) => a + b)).reduce((a, b) => a + b)
);

function getSceneScore(x: number, y: number): number {
    const treeValue = arr[y][x];

    // Top Scene
    let topScore = 0;
    for (let i = y - 1; i >= 0; i--) {
        if (treeValue > arr[i][x]) topScore++;
        else {
            topScore++;
            break;
        }
    }

    // Bottom Scene
    let bottomScore = 0;
    for (let i = y + 1; i < arr.length; i++) {
        if (treeValue > arr[i][x]) bottomScore++;
        else {
            bottomScore++;
            break;
        }
    }

    // Left Scene
    let leftScore = 0;
    for (let i = x - 1; i >= 0; i--) {
        if (treeValue > arr[y][i]) leftScore++;
        else {
            leftScore++;
            break;
        }
    }

    // Right Scene
    let rightScore = 0;
    for (let i = x + 1; i < xLength; i++) {
        if (treeValue > arr[y][i]) rightScore++;
        else {
            rightScore++;
            break;
        }
    }
    return topScore * bottomScore * leftScore * rightScore;
}

let max = 0;

for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
        const score = getSceneScore(x, y);
        if (score > max) max = score;
    }
}

console.log(max);
