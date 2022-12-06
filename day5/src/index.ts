import * as fs from "fs";

const buffer = fs.readFileSync("./src/input.txt");
const fileContent = buffer.toString().split("\n");

console.log("part 1:", crateMover9000(fileContent));
console.log("part 2:", crateMover9001(fileContent));

function crateMover9000(fileContent: string[]) {
    // build cargo
    // console.log(fileContent.slice(0, 8).reverse());
    const cargo = fileContent.slice(0, 8).reverse();
    let stack: string[][] = [];
    for (let line of cargo) {
        for (let i = 0; i < line.length; i++) {
            if (i % 4 == 1 && line[i] !== " ") {
                if (!stack[(i - 1) / 4]) {
                    stack[(i - 1) / 4] = [line[i]];
                } else {
                    stack[(i - 1) / 4].push(line[i]);
                }
            }
        }
    }
    // console.log(stack);
    // console.log(fileContent.slice(10));
    const command = fileContent.slice(10);
    for (let line of command) {
        let matches = line.match(/\d+/g);
        // console.log(matches);
        if (matches) {
            let quantities = parseInt(matches[0]);
            let origin = parseInt(matches[1]);
            let destination = parseInt(matches[2]);
            for (let i = 0; i < quantities; i++) {
                let tmp = stack[origin - 1].pop();
                // console.log(tmp);
                stack[destination - 1].push(tmp!);
            }
        }
    }

    return stack
        .map((item) => {
            return item[item.length - 1];
        })
        .join("");
}

function crateMover9001(fileContent: string[]) {
    // build cargo
    // console.log(fileContent.slice(0, 8).reverse());
    const cargo = fileContent.slice(0, 8).reverse();
    let stack: string[][] = [];
    for (let line of cargo) {
        for (let i = 0; i < line.length; i++) {
            if (i % 4 == 1 && line[i] !== " ") {
                if (!stack[(i - 1) / 4]) {
                    stack[(i - 1) / 4] = [line[i]];
                } else {
                    stack[(i - 1) / 4].push(line[i]);
                }
            }
        }
    }
    // console.log(stack);
    // console.log(fileContent.slice(10));
    const command = fileContent.slice(10);
    for (let line of command) {
        let matches = line.match(/\d+/g);
        // console.log(matches);
        if (matches) {
            let quantities = parseInt(matches[0]);
            let origin = parseInt(matches[1]);
            let destination = parseInt(matches[2]);
            let tmp = [];
            for (let i = 0; i < quantities; i++) {
                tmp.push(stack[origin - 1].pop());
                // console.log(tmp);
            }
            tmp.reverse().map((item) => {
                stack[destination - 1].push(item!);
            });
        }
    }

    return stack
        .map((item) => {
            return item[item.length - 1];
        })
        .join("");
}
