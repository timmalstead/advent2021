import { readFileSync } from "fs";

const add = (firstNum: number, secondNum: number): number =>
  firstNum + secondNum;

const input: number[] = readFileSync("./input/day1.txt")
  .toString()
  .split("\n")
  .map((s: string): number => +s);

const largerDepthMeasurements = (depths: number[]): number => {
  let largerThanPrevious: number = 0;

  for (let i = 0; i < depths.length - 1; ++i) {
    const [cur, nxt]: number[] = [depths[i], depths[i + 1]];

    if (nxt > cur) ++largerThanPrevious;
  }

  return largerThanPrevious;
};

const threeWindowSum = (depths: number[]): number => {
  let [largerThanPrevious, previousSum]: number[] = [
    0,
    depths.slice(0, 3).reduce(add),
  ];

  for (let i = 1; i < depths.length - 2; ++i) {
    const sum: number = [depths[i], depths[i + 1], depths[i + 2]].reduce(add);

    if (sum > previousSum) ++largerThanPrevious;

    previousSum = sum;
  }

  return largerThanPrevious;
};

console.log(largerDepthMeasurements(input), threeWindowSum(input));
