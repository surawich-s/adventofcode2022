import * as fs from "fs";
import * as assert from "assert";

const compare = (one: any, two: any): boolean | undefined => {
    if (typeof one == "number" && typeof two === "number") {
        return one > two ? false : one < two ? true : undefined;
    } else if (Array.isArray(one) !== Array.isArray(two)) {
        return compare(
            Array.isArray(one) ? one : [one],
            Array.isArray(two) ? two : [two]
        );
    }

    for (let i = 0, end = Math.max(one.length, two.length); i < end; i++) {
        if (one[i] == undefined) return true;
        if (two[i] == undefined) return false;
        const result = compare(one[i], two[i]);
        if (result !== undefined) return result;
    }
    return undefined;
};

const solvePartOne = (data: string): any => {
    let sum = 0;
    for (const [i, lines] of data.split("\n\n").entries()) {
        const [one, two] = lines.split("\n").map((raw) => JSON.parse(raw));
        //console.log(one, two);
        if (compare(one, two)) sum += i + 1;
    }

    return sum;
};

const data = fs.readFileSync("./src/day13.txt").toString();
assert.deepStrictEqual(
    solvePartOne(`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`),
    13
);
console.log(solvePartOne(data));

const calculateDecodeerKey = (data: string, ...extraPackets: any): number => {
    const packets = [
        ...extraPackets,
        ...data
            .trim()
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean)
            .map((raw) => JSON.parse(raw)),
    ].sort((a, b) => {
        const result = compare(a, b);
        return result === undefined ? 0 : result ? -1 : 1;
    });

    return extraPackets.reduce(
        (product: number, packet: any) =>
            product *
            (1 +
                packets.findIndex(
                    (p) => JSON.stringify(p) == JSON.stringify(packet)
                )),
        1
    );
};

const solvePartTwo = (data: string) => {
    return calculateDecodeerKey(data, [[2]], [[6]]);
};

assert.deepStrictEqual(
    solvePartTwo(`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`),
    140
);
console.log(solvePartTwo(data));
