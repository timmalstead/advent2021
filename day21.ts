import { parseInput, add } from "./utils";
const [{ log }, { min }] = [console, Math];

const input: [number, number] = parseInput(__filename).map(
  (s) => +s[s.length - 1]
) as [number, number];

const preventOverflow = (n: number): number => (n > 10 ? n % 10 : n);

const less100 = (n: number): number => (n > 100 ? n - 100 : n);

const practiceGame = (n: [number, number]): number => {
  let [
    i,
    player1Score,
    player2Score,
    player1Space,
    player2Space,
    timesRolled,
  ]: number[] = [1, 0, 0, n[0], n[1], 0];

  while (player1Score < 1000 && player2Score < 1000) {
    const player1Turn: number = [i, i + 1, i + 2].map(less100).reduce(add);
    const player2Turn: number = [i + 3, i + 4, i + 5].map(less100).reduce(add);

    player1Space += preventOverflow(player1Turn);
    player2Space += preventOverflow(player2Turn);

    player1Space = preventOverflow(player1Space);
    player2Space = preventOverflow(player2Space);

    player1Score += preventOverflow(player1Space);
    timesRolled += 3;

    if (player1Score >= 1000) break;

    player2Score += preventOverflow(player2Space);
    timesRolled += 3;

    if (player2Score >= 1000) break;

    i += 6;
    i = less100(i);
  }

  return min(player1Score, player2Score) * timesRolled;
};

log(practiceGame(input));
