import { parseInput } from "./utils";
const [{ log }, { abs }] = [console, Math];

const input: string[] = parseInput(__filename);

const findManhattanDistance = (nav: string[]): number => {
  let [eastWest, northSouth, dir]: number[] = [0, 0, 90];

  for (const n of nav) {
    const [d, val]: [string, number] = [n[0], +n.slice(1)];

    if (d === "L") {
      dir -= val;
      if (dir < 0) dir += 360;
    } else if (d === "R") {
      dir += val;
      if (dir >= 360) dir -= 360;
    } else if (d === "N" || (d === "F" && dir === 0)) northSouth += val;
    else if (d === "S" || (d === "F" && dir === 180)) northSouth -= val;
    else if (d === "E" || (d === "F" && dir === 90)) eastWest += val;
    else if (d === "W" || (d === "F" && dir === 270)) eastWest -= val;
  }

  return abs(eastWest) + abs(northSouth);
};

log(findManhattanDistance(input));
