"use strict";
exports.__esModule = true;
var fs = require("fs");
var buffer = fs.readFileSync("input.txt");
var fileContent = buffer.toString().split("\n");
var sum1 = 0;
var sum2 = 0;
for (var _i = 0, fileContent_1 = fileContent; _i < fileContent_1.length; _i++) {
    var line = fileContent_1[_i];
    if (line.charCodeAt(2) - line.charCodeAt(0) - 23 == 1 ||
        line.charCodeAt(2) - line.charCodeAt(0) - 23 == -2) {
        sum1 += 6;
    }
    else if (line.charCodeAt(2) - line.charCodeAt(0) - 23 == 0) {
        sum1 += 3;
    }
    sum1 += line.charCodeAt(2) - 87;
}
// A: ROCK B: PAPER C: SCISSOR
for (var _a = 0, fileContent_2 = fileContent; _a < fileContent_2.length; _a++) {
    var line = fileContent_2[_a];
    if (line[2] == "Z") {
        sum2 += 6;
        if (line[0] == "C") {
            sum2 += 1;
        }
        else {
            sum2 += line.charCodeAt(0) - 64 + 1;
        }
    }
    else if (line[2] == "Y") {
        sum2 += 3;
        sum2 += line.charCodeAt(0) - 64;
    }
    else {
        if (line[0] == "A") {
            sum2 += 3;
        }
        else {
            sum2 += line.charCodeAt(0) - 64 - 1;
        }
    }
}
console.log("part 1:", sum1);
console.log("part 2:", sum2);
