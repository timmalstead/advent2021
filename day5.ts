import { parseInput } from "./utils";

interface PointPair {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

interface Point {
  x: number;
  y: number;
}

const { values, keys, entries } = Object;

const input: PointPair[] = parseInput(__filename).reduce((holder, str) => {
  const [x1, y1, x2, y2] = str
    .replace(" -> ", ",")
    .split(",")
    .map((s) => +s);

  holder.push({ x1, y1, x2, y2 });
  return holder;
}, []);

const vAndHEndPoints: PointPair[] = input.filter(
  ({ x1, x2, y1, y2 }) => x1 === x2 || y1 === y2
);

const allPointsOnLines = vAndHEndPoints.reduce((arr, { x1, x2, y1, y2 }) => {
  const matchingPoints: PointPair = x1 === x2 ? { x1, x2 } : { y1, y2 };
  const nonMatchingPoints: PointPair =
    matchingPoints.y1 === undefined ? { y1, y2 } : { x1, x2 };

  const matchngValue: number = values(matchingPoints)[0];
  const matchingKeyCoord: string = keys(matchingPoints)[0][0];
  const nonMatchVals: number[] = values(nonMatchingPoints);

  const iOfLarger: number = nonMatchVals.indexOf(Math.max(...nonMatchVals));
  const iOfSmaller: number = iOfLarger === 0 ? 1 : 0;

  for (let i = nonMatchVals[iOfSmaller]; i <= nonMatchVals[iOfLarger]; ++i) {
    arr.push(
      matchingKeyCoord === "x"
        ? `${matchingKeyCoord}-${matchngValue}-${
            matchingKeyCoord === "x" ? "y" : "x"
          }-${i}`
        : `${
            matchingKeyCoord === "x" ? "y" : "x"
          }-${i}-${matchingKeyCoord}-${matchngValue}`
    );
  }

  return arr;
}, []);

const counter: { [keyToCount: string]: number } = allPointsOnLines.reduce(
  (obj, str) => {
    obj[str] = ++obj[str] || 1;

    return obj;
  },
  {}
);

const numberOfVents: number = values(counter).filter((n) => n > 1).length;

console.log(numberOfVents);
