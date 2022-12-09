import * as fs from "fs";

const buffer = fs.readFileSync("./src/day9.txt");
const fileContent = buffer.toString().split("\n");

console.log("part 1:", whereDaTailGone(fileContent, 2));
console.log("part 2:", whereDaTailGone(fileContent, 10));

function whereDaTailGone(fileContent: string[], length: number) {
    const knots = Array.from({ length }, () => [0, 0]);
    let pos: number[][] = [];
    pos.push([0, 0]);

    function moveIt(arr: number[], direction: string) {
        switch (direction) {
            case "U":
                arr = [arr[0], arr[1] + 1];
                break;
            case "D":
                arr = [arr[0], arr[1] - 1];
                break;
            case "R":
                arr = [arr[0] + 1, arr[1]];
                break;
            case "L":
                arr = [arr[0] - 1, arr[1]];
                break;
        }
        return arr;
    }

    for (let line of fileContent) {
        const commands = line.split(" ");
        const [direction, steps] = [commands[0], parseInt(commands[1])];
        let move = 0;
        while (move < steps) {
            knots[0] = moveIt(knots[0], direction);
            for (let i = 0; i < knots.length - 1; i++) {
                // Head moves a far more than 1 point so Tail need to follow
                let [tail_x, tail_y] = knots[i + 1];
                let dis_x = knots[i][0] - knots[i + 1][0];
                let dis_y = knots[i][1] - knots[i + 1][1];
                if (Math.abs(dis_x) > 1 || Math.abs(dis_y) > 1) {
                    knots[i + 1] = [
                        tail_x + Math.sign(dis_x),
                        tail_y + Math.sign(dis_y),
                    ];
                }
            }

            const found = pos.find(
                (element) =>
                    element[0] == knots[knots.length - 1][0] &&
                    element[1] == knots[knots.length - 1][1]
            );

            if (!found) {
                pos.push(knots[knots.length - 1]);
            }

            move++;
        }
        move = 0;
    }
    return pos.length;
}
