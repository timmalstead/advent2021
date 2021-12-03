import { parseInput } from "./utils";

const input: string[] = parseInput(__filename);

const binDiagnostic = (arr: string[]): number => {
  let [start, iter, zero, one]: number[] = [0, 0, 0, 0];
  let [gamma, epsilon]: string[] = ["", ""];

  const str: string = arr.join("");
  const len: number = str.length;

  for (let i = start; iter <= len; i += arr[0].length, ++iter) {
    let curBit: string = str[i];

    if (!curBit) {
      gamma += zero > one ? "0" : "1";

      zero = 0;
      one = 0;
      i = ++start;
      curBit = str[i];
    }

    if (curBit === "0") ++zero;
    else if (curBit === "1") ++one;
  }

  for (const char of gamma) epsilon += char === "0" ? "1" : "0";

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const lifeSupportRating = (arr: string[]): number => {
  let o2RateFilter: string[], co2RateFilter: string[];
  let [startsWithZero, startsWithOne]: string[][] = [[], []];
  let [curBin, curPos, o2Rate, co2rate]: number[] = [0, 0, 0, 0];

  while (!co2rate) {
    const curArr: string[] = co2RateFilter || arr;
    let bin: string = curArr[curBin];

    if (!bin) {
      const [zLen, oLen]: number[] = [
        startsWithZero.length,
        startsWithOne.length,
      ];

      if (zLen === oLen)
        co2RateFilter = curArr.filter(
          (s: string): boolean => s[curPos] === "0"
        );
      else if (zLen < oLen) co2RateFilter = startsWithZero;
      else if (oLen < zLen) co2RateFilter = startsWithOne;

      if (co2RateFilter.length === 1) {
        co2rate = parseInt(co2RateFilter[0], 2);
        break;
      } else {
        startsWithZero = [];
        startsWithOne = [];
        curBin = 0;
        bin = co2RateFilter[curBin];
        ++curPos;
      }
    }

    const bit: string = bin[curPos];

    if (bit === "0") startsWithZero.push(bin);
    else if (bit === "1") startsWithOne.push(bin);

    ++curBin;
  }

  startsWithOne = [];
  startsWithZero = [];
  curBin = 0;
  curPos = 0;

  while (!o2Rate) {
    const curArr: string[] = o2RateFilter || arr;
    let bin: string = curArr[curBin];

    if (!bin) {
      const [zLen, oLen]: number[] = [
        startsWithZero.length,
        startsWithOne.length,
      ];

      if (zLen === oLen)
        o2RateFilter = curArr.filter((s: string): boolean => s[curPos] === "1");
      else if (zLen > oLen) o2RateFilter = startsWithZero;
      else if (oLen > zLen) o2RateFilter = startsWithOne;

      if (o2RateFilter.length === 1) {
        o2Rate = parseInt(o2RateFilter[0], 2);
        break;
      } else {
        startsWithZero = [];
        startsWithOne = [];
        curBin = 0;
        bin = o2RateFilter[curBin];
        ++curPos;
      }
    }

    const bit: string = bin[curPos];

    if (bit === "0") startsWithZero.push(bin);
    else if (bit === "1") startsWithOne.push(bin);

    ++curBin;
  }

  return o2Rate * co2rate;
};

console.log(binDiagnostic(input), lifeSupportRating(input));
