import { parseInput } from "./utils";

interface Dir {
  dir: string;
  val: number;
}

const input: Dir[] = parseInput(__filename).map((s: string): Dir => {
  const arr: string[] = s.split(" ");

  return { dir: arr[0], val: +arr[1] };
});

const findPosition = (inputs: Dir[]): number => {
  let [horizontal, depth]: number[] = [0, 0];

  for (const { dir, val } of inputs)
    if (dir === "down") depth += val;
    else if (dir === "up") depth -= val;
    else if (dir === "forward") horizontal += val;

  return horizontal * depth;
};

const findCorrectPosition = (inputs: Dir[]): number => {
  let [horizontal, depth, aim]: number[] = [0, 0, 0];

  for (const { dir, val } of inputs)
    if (dir === "down") aim += val;
    else if (dir === "up") aim -= val;
    else if (dir === "forward") {
      horizontal += val;
      depth += aim * val;
    }

  return horizontal * depth;
};

console.log(findPosition(input), findCorrectPosition(input));
