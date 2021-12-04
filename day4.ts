import { loadInput, add } from "./utils";
const { log } = console;

type Tensor = number[][][];

const convertBoards = (board: Tensor): Tensor => {
  const verticalBoards: Tensor = [];
  let startingIndex: number = 0;
  let [singleBoard, singleRow]: [number[][], number[]] = [[], []];

  const numbers: number[] = board.flat(2);
  for (let i = startingIndex, j = 0; j <= numbers.length; i += 5, ++j) {
    if (singleRow.length === 5) {
      singleBoard.push(singleRow);

      i = ++startingIndex;

      if (singleBoard.length === 5) {
        verticalBoards.push(singleBoard);
        singleBoard = [];

        i = startingIndex += 20;
      }
      singleRow = [];
    }
    singleRow.push(numbers[i]);
  }

  return verticalBoards;
};

const input: string = loadInput(__filename);

const horizontalBoards: Tensor = input
  .split("\n\n")
  .slice(1)
  .map((board) =>
    board.split("\n").map((line) =>
      line
        .trim()
        .split(/\s+/)
        .map((numStr) => +numStr)
    )
  );

const verticalBoards: Tensor = convertBoards(horizontalBoards);

const numsToCall: number[] = input
  .split("\n")[0]
  .split(",")
  .map((n) => +n);

const checkRow = (rowToCheck: number[], numsCalled: number[]): boolean =>
  rowToCheck.every((num: number): boolean => numsCalled.includes(num));

//#region part one

// let winningBoard: number[][],
//   numsCalled: number[] = [];

// for (let i = 0; i < numsToCall.length; ++i) {
//   numsCalled.push(numsToCall[i]);

//   for (let j = 0; j < horizontalBoards.length; ++j) {
//     const board: number[][] = [...horizontalBoards[j], ...verticalBoards[j]];

//     for (let k = 0; k < board.length; ++k) {
//       const row: number[] = board[k];
//       if (checkRow(row, numsCalled)) {
//         winningBoard = horizontalBoards[j];
//         break;
//       }
//     }
//     if (winningBoard) break;
//   }
//   if (winningBoard) break;
// }

// const unmarkedNumbers: number = winningBoard
//   .flat()
//   .filter((num) => !numsCalled.includes(num))
//   .reduce(add);

// log(unmarkedNumbers * numsCalled.pop());

//#endregion

//#region part two

let lastNumsCalled: number[],
  winningBoards: Tensor = [],
  numsCalled: number[] = [];

const cachedBoardLength: number = horizontalBoards.length;

for (let i = 0; i < numsToCall.length; ++i) {
  numsCalled.push(numsToCall[i]);

  for (let j = 0; j < horizontalBoards.length; ++j) {
    const board: number[][] = [...horizontalBoards[j], ...verticalBoards[j]];

    for (let k = 0; k < board.length; ++k) {
      const row: number[] = board[k];
      if (checkRow(row, numsCalled)) {
        winningBoards.push(horizontalBoards[j]);
        horizontalBoards.splice(j, 1);
        verticalBoards.splice(j, 1);
        break;
      }
    }
    if (winningBoards.length === cachedBoardLength) break;
  }
  if (winningBoards.length === cachedBoardLength) break;
}

const unmarkedNumbers: number = winningBoards
  .pop()
  .flat()
  .filter((num) => !numsCalled.includes(num))
  .reduce(add);

log(unmarkedNumbers * numsCalled.pop());

//#endregion
