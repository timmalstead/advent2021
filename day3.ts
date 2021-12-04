import { parseInput } from "./utils";

const input: string[] = parseInput(__filename);

const binDiagnostic = (input: string[]): number => {
  let [startPosition, j, zeroes, ones]: number[] = [0, 0, 0, 0];
  let gamma: string = "";
  const str: string = input.join("");

  for (let i = startPosition; j <= str.length; i += input[0].length, ++j) {
    let curBit: string = str[i];

    if (!curBit) {
      gamma += zeroes > ones ? "0" : "1";

      zeroes = 0;
      ones = 0;
      i = ++startPosition;
      curBit = str[i];
    }

    if (curBit === "0") ++zeroes;
    else ++ones;
  }

  const epsilon: string = gamma
    .split("")
    .map((s) => (s === "0" ? "1" : "0"))
    .join("");

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const lifeSupportRating = (input: string[]): number => {
  let [o2RateFilter, c02Filter, moreZeroes, moreOnes]: string[][] = [
    [...input],
    [...input],
    [],
    [],
  ];
  let [i, j]: number[] = [0, 0];

  while (o2RateFilter.length > 1) {
    let binStr: string = o2RateFilter[i];

    if (!binStr) {
      const [moreZeroesLen, moreOnesLen]: number[] = [
        moreZeroes.length,
        moreOnes.length,
      ];

      if (moreZeroesLen === moreOnesLen)
        o2RateFilter = o2RateFilter.filter(
          (s: string): boolean => s[j] === "1"
        );
      else if (moreZeroesLen > moreOnesLen) o2RateFilter = moreZeroes;
      else if (moreOnesLen > moreZeroesLen) o2RateFilter = moreOnes;

      if (o2RateFilter.length === 1) continue;
      else {
        moreZeroes = [];
        moreOnes = [];
        i = 0;
        binStr = o2RateFilter[i];
        ++j;
      }
    }

    const bit: string = binStr[j];

    if (bit === "0") moreZeroes.push(binStr);
    else if (bit === "1") moreOnes.push(binStr);

    ++i;
  }

  i = 0;
  j = 0;
  moreZeroes = [];
  moreOnes = [];

  while (c02Filter.length > 1) {
    let binStr: string = c02Filter[i];

    if (!binStr) {
      const [moreZeroesLen, moreOnesLen]: number[] = [
        moreZeroes.length,
        moreOnes.length,
      ];

      if (moreZeroesLen === moreOnesLen)
        c02Filter = c02Filter.filter((s: string): boolean => s[j] === "0");
      else if (moreZeroesLen < moreOnesLen) c02Filter = moreZeroes;
      else if (moreOnesLen < moreZeroesLen) c02Filter = moreOnes;

      if (c02Filter.length === 1) continue;
      else {
        moreZeroes = [];
        moreOnes = [];
        i = 0;
        binStr = c02Filter[i];
        ++j;
      }
    }

    const bit: string = binStr[j];

    if (bit === "0") moreZeroes.push(binStr);
    else if (bit === "1") moreOnes.push(binStr);

    ++i;
  }

  return parseInt(o2RateFilter[0], 2) * parseInt(c02Filter[0], 2);
};

console.log(binDiagnostic(input), lifeSupportRating(input));
