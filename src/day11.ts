import * as fs from "fs";

const buffer = fs.readFileSync("./src/day11.txt");
const fileContent = buffer.toString().trim().split("\n\n");

class Monkey {
    items: number[];
    operation: string[];
    test: number;
    ifTrue: number;
    ifFalse: number;

    constructor(input: string) {
        const monkey: string[] = input.split("\n");
        this.items = monkey[1]
            .split(": ")[1]
            .split(", ")
            .map((x) => parseInt(x));
        this.operation = monkey[2].split("new = old ")[1].split(" ");
        this.test = parseInt(monkey[3].split("divisible by ")[1]);
        this.ifTrue = parseInt(monkey[4].split("to monkey ")[1]);
        this.ifFalse = parseInt(monkey[5].split("to monkey ")[1]);
    }

    get len() {
        return this.items.length;
    }

    inspect(item: number, woried: boolean): [boolean, number] {
        const factor: number =
            this.operation[1] === "old" ? item : parseInt(this.operation[1]);
        let worryLevel = item;
        if (this.operation[0] === "+") {
            worryLevel = worryLevel + factor;
        } else {
            worryLevel = worryLevel * factor;
        }
        if (!woried) {
            worryLevel = Math.floor(worryLevel / 3);
        }
        const test: boolean = worryLevel % this.test === 0;
        // debugger
        return [test, worryLevel];
    }
}

function solve(
    fileContent: string[],
    woried: boolean = false,
    rounds: number = 20
): string | number {
    const monkeys: Monkey[] = fileContent.map((x) => new Monkey(x));
    const monkeysLen = monkeys.length;
    const monkeysOverhead: number = monkeys
        .map((monkey) => monkey.test)
        .reduce((a, x) => a * x); // cap on bignumbers
    const monkeysActivity: number[] = Array(monkeysLen).fill(0);

    for (let i = 0; i < rounds; i++) {
        for (let m = 0; m < monkeysLen; m++) {
            const currentMonkey: Monkey = monkeys[m];
            const itemsLen: number = monkeys[m].len;

            if (itemsLen > 0) {
                for (let it = 0; it < itemsLen; it++) {
                    const currentItem: number = currentMonkey.items.shift()!;
                    const [test, itemPostInspection] = currentMonkey.inspect(
                        currentItem,
                        woried
                    );
                    monkeys[
                        test ? currentMonkey.ifTrue : currentMonkey.ifFalse
                    ].items.push(itemPostInspection % monkeysOverhead);
                    monkeysActivity[m]++;
                }
            }
        }
    }
    const sorted = monkeysActivity.sort((a, b) => b - a);
    return sorted[0] * sorted[1];
}

console.log(`part 1: ${solve(fileContent)}`);
console.log(`part 2: ${solve(fileContent, true, 10000)}`);
