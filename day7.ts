import { loadInput, add } from "./utils";
const [{ log }, { MAX_VALUE }, { abs, ceil, floor, min }] = [
  console,
  Number,
  Math,
];

const input: number[] = loadInput(__filename)
  .split(",")
  .map((s) => +s);

const smallestNumberOfMoves2 = (list: number[]): number => {
  let median: number,
    final: number = 0;
  list.sort((a, b) => a - b);

  const { length } = list;

  const half = length / 2;

  const isEven: boolean = list.length % 2 === 0 ? true : false;

  median = isEven ? (list[half - 1] + list[half]) / 2 : list[ceil(half)];

  for (const int of list) {
    final += abs(int - median);
  }

  return final;
};

const gaussSum = (n: number): number => (n * (n + 1)) / 2;

log(gaussSum(4));

const adjustedSmallestNumberOfMoves2 = (list: number[]): number => {
  let fFinal: number = 0,
    cFinal: number = 0;

  const avg: number = list.reduce(add) / list.length;
  const [fAvg, cAvg]: number[] = [floor(avg), ceil(avg)];

  for (const int of list) {
    const [fVal, cVal]: number[] = [abs(int - fAvg), abs(int - cAvg)];

    fFinal += (fVal * (fVal + 1)) / 2;
    cFinal += (cVal * (cVal + 1)) / 2;
  }

  return min(fFinal, cFinal);
};

// const smallestNumberOfMoves = (list: number[]): number => {
//   let smallestSum: number = MAX_VALUE;
//   for (const int of list) {
//     const sum: number = list.reduce((sum, cur) => (sum += abs(cur - int)), 0);

//     if (sum < smallestSum) smallestSum = sum;
//   }

//   return smallestSum;
// };

// const factorReduce = (num: number): number => {
//   let sum: number = 0;

//   for (let i = num; i > 1; --i) sum += i;

//   return sum;
// };

// log(factorReduce(11));

// const adjustedNumberOfMoves = (list: number[]): number => {
//   let smallestSum: number = MAX_VALUE;
//   for (let i = 1; i <= list.length; ++i) {
//     const sum: number = list.reduce((sum, cur) => (sum += abs(cur - i)), 0);

//     log(sum);
//     //   log(list[i - 1] - i);

//     const factor: number = factorReduce(abs(sum));

//     if (factor < smallestSum) smallestSum = factor;
//   }

//   return smallestSum;
// };

// 168

log(
  // smallestNumberOfMoves(input),
  // adjustedNumberOfMoves(input)
  // smallestNumberOfMoves2(input),
  adjustedSmallestNumberOfMoves2(input)
);
