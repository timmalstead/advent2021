import { parseInput, add } from "./utils";
const { log } = console;

type Matrix = number[][];
interface Direction {
  yPlus: number;
  xPlus: number;
}

const input: Matrix = parseInput(__filename).map((s) =>
  s.split("").map((n) => +n)
);

const dirs: Direction[] = [
  { yPlus: 1, xPlus: 0 }, //up
  { yPlus: 1, xPlus: 1 }, //up-right
  { yPlus: 0, xPlus: 1 }, //right
  { yPlus: -1, xPlus: 1 }, //right
  { yPlus: -1, xPlus: 0 }, //down
  { yPlus: -1, xPlus: -1 }, //down-left
  { yPlus: 0, xPlus: -1 }, //left
  { yPlus: 1, xPlus: -1 }, //up-left
];

const octopusFlashSequence = (mat: Matrix, y: number, x: number): Matrix => {
  const curVal: number = mat[y]?.[x];

  if (curVal) {
    const newVal: number = curVal === 10 ? curVal : ++mat[y][x];

    if (newVal === 10) {
      mat[y][x] = 0;
      dirs.forEach(({ yPlus, xPlus }: Direction): void => {
        const [newY, newX]: number[] = [y + yPlus, x + xPlus];

        if (mat[newY]?.[newX]) octopusFlashSequence(mat, newY, newX);
      });
    }
  }

  return mat;
};

const mapOctopusFlashes = (mat: Matrix): number => {
  let totalFlashes: number = 0;

  for (let i = 0; i < 100; ++i) {
    for (let j = 0; j < mat.length; ++j)
      for (let k = 0; k < mat[0].length; ++k) ++mat[j][k];

    for (let y = 0; y < mat.length; ++y)
      for (let x = 0; x < mat[0].length; ++x)
        if (mat[y][x] === 10) octopusFlashSequence(mat, y, x);

    totalFlashes += mat.flat().filter((n) => !n).length;
  }

  return totalFlashes;
};

const firstSyncFlash = (mat: Matrix): number => {
  let hasNotFlashedInSync: boolean = true;
  let totalSteps: number = 0;

  while (hasNotFlashedInSync) {
    ++totalSteps;

    for (let j = 0; j < mat.length; ++j)
      for (let k = 0; k < mat[0].length; ++k) ++mat[j][k];

    for (let y = 0; y < mat.length; ++y)
      for (let x = 0; x < mat[0].length; ++x)
        if (mat[y][x] === 10) octopusFlashSequence(mat, y, x);

    hasNotFlashedInSync = !!mat.flat().reduce(add);
  }

  return totalSteps;
};

log(mapOctopusFlashes(input), firstSyncFlash(input));
