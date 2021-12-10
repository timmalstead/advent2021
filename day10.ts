import { parseInput, asc } from "./utils";
const { log } = console;
const input = parseInput(__filename);

interface CodeSegment {
  char: string;
  val: number;
}

const key: { [char: string]: CodeSegment } = {
  ")": { char: "(", val: 3 },
  "]": { char: "[", val: 57 },
  "}": { char: "{", val: 1197 },
  ">": { char: "<", val: 25137 },
};

const reverseKey: { [char: string]: string } = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const autoCompleteVals: { [char: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const fixIncompleteLines = (chunks: string[]): number => {
  const [incompleteLines, completionStrings]: string[][] = [[], []];

  for (const line of chunks) {
    let validLine: boolean = true;
    const stack: string[] = [];

    for (const char of line)
      if (!key[char]) stack.push(char);
      else if (key[char].char !== stack.pop()) {
        validLine = false;
        break;
      }

    if (validLine) incompleteLines.push(line);
  }

  for (const line of incompleteLines) {
    const stack: string[] = [];

    for (const char of line)
      if (!key[char]) stack.push(char);
      else stack.pop();

    let lineToAdd: string = "";
    stack.reverse().forEach((s) => (lineToAdd += reverseKey[s]));

    completionStrings.push(lineToAdd);
  }

  const completionVals: number[] = completionStrings
    .map((s) =>
      s
        .split("")
        .reduce((acc, str) => (acc = acc * 5 + autoCompleteVals[str]), 0)
    )
    .sort(asc);

  return completionVals[Math.floor(completionVals.length / 2)];
};

log(fixIncompleteLines(input));

const findCorruptPoints = (chunks: string[]): number => {
  let totalCorruptPoints: number = 0;

  for (const line of chunks) {
    const stack: string[] = [];

    for (const char of line)
      if (!key[char]) stack.push(char);
      else if (key[char].char !== stack.pop()) {
        totalCorruptPoints += key[char].val;
        break;
      }
  }

  return totalCorruptPoints;
};

// log(findCorruptPoints(input));
