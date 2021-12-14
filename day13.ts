import { loadInput } from "./utils";
const [{ log }, { max }] = [console, Math];

interface Coord {
  x: number;
  y: number;
}

interface Fold {
  direction: string;
  amount: number;
}

type Paper = string[][];

const load: string[] = loadInput(__filename).split("\n\n");

const coords: Coord[] = load[0].split("\n").map((s) => {
  const c: number[] = s.split(",").map((n) => +n);

  return { x: c[0], y: c[1] };
});

const folds: Fold[] = load[1].split("\n").map((s) => {
  const sArr: string[] = s.replace("fold along ", "").split("=");

  return { direction: sArr[0], amount: +sArr[1] };
});

const splitAndFold = (c: Coord[], f: Fold[]): number => {
  let p: Paper = [],
    first: Paper,
    second: Paper;

  const highX: number = max(...c.map(({ x }) => x)) + 1;
  const highY: number = max(...c.map(({ y }) => y)) + 1;

  log(highX);
  for (let i = 0; i < highY; ++i) p.push(".".repeat(highX).split(""));

  c.forEach(({ x, y }) => (p[y][x] = "#"));

  log(p.length);

  for (let i = 0; i < 1; ++i) {
    const { direction, amount } = f[i];

    if (direction === "y") {
      first = p.slice(0, amount);
      second = p.slice(p.length - amount);

      second.reverse();
      p = first;

      for (let j = 0; j < second.length; ++j)
        for (let k = 0; k < second[0].length; ++k) {
          if (second[j]?.[k] === "#" && p[p.length - (second.length - j)]?.[k])
            p[p.length - (second.length - j)][k] = "#";
        }

      //   for (let j = second.length - 1; j >= 0; --j)
      //     for (let k = 0; k < second[0].length; ++k) {
      //       if (p[j]?.[k] === "#" && p[p.length - j]?.[k])
      //         p[p.length - j][k] = "#";
      //     }

      //   second.reverse();
      //   p = first;

      //   for (let j = 0; j < second.length; ++j)
      //     for (let k = 0; k < second[0].length; ++k)
      //       if (second[j]?.[k] === "#") p[p.length - second.length][k] = "#";
    } else {
      first = p.map((a) => a.slice(0, amount));
      second = p.map((a) => a.slice(a.length + 1));

      log(first[0].length, second[0].length);

      //   first.forEach((a) => log(a.join("")));
      //   second.forEach((a) => log(a.join("")));

      p = first;

      for (let j = 0; j < second.length; ++j)
        for (let k = 0; k < second[0].length; ++k)
          if (second[j]?.[k] === "#" && p[j]?.[k]) p[j][k] = "#";
    }
  }

  p.forEach((a) => log(a.join("")));

  return p.flat().filter((s) => s === "#").length;
};

log(splitAndFold(coords, folds));
