import { parseInput } from "./utils";
const { log } = console;

const input: string[] = parseInput(__filename);

type BusIds = Array<number | string>;
interface Departure {
  depart: number;
  id: number;
}

const earliestTime: number = +input[0];

const busIdsAndTimes: BusIds = input[1]
  .split(",")
  .map((s) => (s === "x" ? s : +s));

const findNextDeparture = (timeStamp: number, busId: number): number => {
  let nextDeparture: number = 0;

  while (nextDeparture < timeStamp) nextDeparture += busId;

  return nextDeparture;
};

const findEarliestDeparture = (timeStamp: number, busIds: number[]): number => {
  let earliestDeparture: number, earlyDepartId: number;

  for (const id of busIds) {
    const nxtDepart: number = findNextDeparture(timeStamp, id) - timeStamp;

    if (!earliestDeparture || nxtDepart < earliestDeparture) {
      earliestDeparture = nxtDepart;
      earlyDepartId = id;
    }
  }

  return earliestDeparture * earlyDepartId;
};

log(
  findEarliestDeparture(
    earliestTime,
    busIdsAndTimes.filter((v) => typeof v !== "string") as number[]
  )
);
