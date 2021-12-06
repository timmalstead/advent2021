import { loadInput } from "./utils";

const input: number[] = loadInput(__filename)
  .split(",")
  .map((s) => +s);

const lanternfishReproduction = (
  state: number[],
  daysToModel: number
): number => {
  let newFishes: number[] = [];

  for (let i = 0; i < daysToModel; ++i) {
    state = state.map((n: number): number => --n);

    for (let j = 0; j < state.length; ++j)
      if (state[j] === -1) {
        state[j] = 6;
        newFishes.push(8);
      }

    state = [...state, ...newFishes];
    newFishes = [];
  }

  return state.length;
};

console.log(lanternfishReproduction(input, 14));

// const rough = (startingLength: number, daysToProject: number): number => {
//   //   const by7 = daysToProject / 7;

//   for (let i = 0; i < daysToProject; ++i) startingLength *= 1.0914810205;

//   return startingLength;
// };

// log(rough(5, 256));
//.1428
//343597383680
//0.1428571429
//0.1666666667

//26984457539
//26984489176.80408
//26984511328.459187

// let finalish: number = 343597383680;
// for (let i = 0; i < 4; ++i) finalish = Math.round((finalish *= 0.5259));

// log(finalish);

// log([3, 4, 3, 1, 2, 3, 4, 5, 5, 6, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8].length);

// log(105408037.26171875 * 256);
// log(0.10540803726171875 * 256);

// log(input.length * 0.10540803726171875);
