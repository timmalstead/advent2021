import { loadInput } from "./utils";

const { log } = console;

const [xRange, yRange] = loadInput(__filename)
  .replace("target area: ", "")
  .split(", ")
  .map((s) =>
    s
      .slice(2)
      .split("..")
      .map((s) => +s)
  );

// const parseRange = (s: string): Set<number> => {
//   const range: Set<number> = new Set<number>();

//   const [lowBound, upperBound]: number[] = s
//     .slice(2)
//     .split("..")
//     .map((s) => +s);

//   log(lowBound, upperBound);
//   for (let i = lowBound; i <= upperBound; ++i) range.add(i);

//   return range;
// };

// const [xRange, yRange]: Set<number>[] = [
//   parseRange(input[0]),
//   parseRange(input[1]),
// ];
