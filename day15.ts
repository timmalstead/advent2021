import { parseInput } from "./utils";
const [{ log }, { min }] = [console, Math];

type NumMatrix = number[][];
interface Direction {
  moveX: number;
  moveY: number;
}

interface NextMove {
  nextVal: number;
  newY: number;
  newX: number;
}

const dirs: Direction[] = [
  { moveX: 0, moveY: 1 }, //up
  { moveX: 1, moveY: 0 }, //right
  { moveX: 0, moveY: -1 }, //down
  { moveX: -1, moveY: 0 }, //left
];

// const findLeastRiskyPath = (
//   m: NumMatrix,
//   y: number = 0,
//   x: number = 0,
//   total: number = 0
// ): number => {
//   let leastValue: number;

//   const curVal: number = m[y]?.[x];

//   if (y === m.length - 1 && x === m[0].length - 1) return total;
//   if (!curVal) return Infinity;
//   else {
//     m[y][x] = null;

//     const riskLevels: number[] = [];

//     dirs.forEach(({ moveY, moveX }) => {
//       const [newY, newX, newTotal]: number[] = [
//         y + moveY,
//         x + moveX,
//         total + curVal,
//       ];

//       if (m[newY]?.[newX])
//         riskLevels.push(findLeastRiskyPath(m, newY, newX, newTotal));
//     });

//     leastValue = min(...riskLevels);
//   }

//   return leastValue;
// };

const findLeastRiskyPath = (
  m: NumMatrix,
  y: number = 0,
  x: number = 0,
  total: number = 0
): number => {
  const curVal: number = m[y]?.[x];

  if (y === m.length - 1 && x === m[0].length - 1) return total;
  else {
    m[y][x] = null;

    const values: NextMove[] = [];

    dirs.forEach(({ moveY, moveX }) => {
      const [newY, newX]: number[] = [y + moveY, x + moveX];

      const nextVal: number = m[newY]?.[newX];

      if (nextVal) values.push({ nextVal, newY, newX });
    });

    // m[y][x] = curVal;
    values.sort((a, b) => a.nextVal - b.nextVal);

    const lowValues: NextMove[] = [];
    for (const value of values) {
      const { nextVal } = value;
      if (nextVal === values[0].nextVal) lowValues.push(value);
      else break;
    }

    const newValues: number[] = lowValues.map(({ newY, newX }) =>
      findLeastRiskyPath(m, newY, newX, total + curVal)
    );

    log(lowValues);

    return min(...newValues);
  }
};

const input: NumMatrix = parseInput(__filename).map((s) =>
  s.split("").map((s) => +s)
);

log(findLeastRiskyPath(input));
