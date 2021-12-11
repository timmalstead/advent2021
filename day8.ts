import { parseInput } from "./utils";
const { log } = console;

const input = parseInput(__filename).map((s) => s.split(" | ")[1].split(" "));

const uniqueLengths: Set<number> = new Set<number>([2, 4, 3, 7]);

let numOfUniqueLengths: number = 0;

input.forEach((a: string[]): void => {
  a.forEach((s: string): void => {
    if (uniqueLengths.has(s.length)) ++numOfUniqueLengths;
  });
});

log(numOfUniqueLengths);
