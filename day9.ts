import { parseInput, asc, product } from "./utils";
const { log } = console;

const input: NumMatrix = parseInput(__filename).map((s) =>
  s.split("").map((s) => +s)
);

type NumMatrix = number[][];
interface Direction {
  x: number;
  y: number;
}

const dirs: Direction[] = [
  { x: 0, y: 1 }, //up
  { x: 1, y: 0 }, //right
  { x: 0, y: -1 }, //down
  { x: -1, y: 0 }, //left
];

const validValue = (n: number): boolean => n !== 9 && n !== undefined;

const exploreBasin = (
  mat: NumMatrix,
  xStart: number,
  yStart: number,
  basinSize: number = 1
): number => {
  const curVal: number = mat?.[yStart]?.[xStart];

  if (validValue(curVal)) {
    mat[yStart][xStart] = undefined;

    dirs.forEach(({ x, y }) => {
      const [newX, newY]: number[] = [xStart + x, yStart + y];
      const valToCheck: number | undefined = mat?.[newY]?.[newX];

      if (validValue(valToCheck)) {
        ++basinSize;

        basinSize = exploreBasin(mat, newX, newY, basinSize);
      }
    });
  }

  return basinSize;
};

const findBasinDepths = (mat: NumMatrix): number => {
  const basins: number[] = [];

  for (let i = 0; i < mat.length; ++i)
    for (let j = 0; j < mat[0].length; ++j) {
      const curVal: number = mat[i][j];
      let [numOfUndefined, lessThanDirections]: number[] = [0, 0];

      dirs.forEach(({ x, y }) => {
        const valToCheck: number | undefined = mat?.[i + y]?.[j + x];

        if (valToCheck === undefined) ++numOfUndefined;
        if (curVal < valToCheck) ++lessThanDirections;
      });

      if (lessThanDirections === dirs.length - numOfUndefined) {
        const basinSize: number = exploreBasin(mat, j, i);

        basins.push(basinSize);
      }
    }

  basins.sort(asc);

  return basins.slice(-3).reduce(product);
};

log(findBasinDepths(input));

const findLowPoints = (mat: NumMatrix): number => {
  let lowPointSum: number = 0;

  for (let i = 0; i < mat.length; ++i)
    for (let j = 0; j < mat[0].length; ++j) {
      const curVal: number = mat[i][j];
      let [numOfUndefined, lessThanDirections]: number[] = [0, 0];

      dirs.forEach(({ x, y }) => {
        const valToCheck: number | undefined = mat?.[i + y]?.[j + x];

        if (valToCheck === undefined) ++numOfUndefined;
        if (curVal < valToCheck) ++lessThanDirections;
      });

      if (lessThanDirections === dirs.length - numOfUndefined)
        lowPointSum += curVal + 1;
    }
  return lowPointSum;
};

// log(findLowPoints(input));
