import { loadInput, asc } from "./utils";
const { log } = console;

interface Rule {
  [pair: string]: string;
}

const load: string[] = loadInput(__filename).split("\n\n");

const formula: string = load[0];

const rules: Rule = load[1]
  .split("\n")
  .map((s) => s.split(" -> "))
  .reduce((obj, [pair, insert]) => {
    obj[pair] = insert;
    return obj;
  }, {});

const insertRules = (n: number, f: string, r: Rule): number => {
  for (let i = 0; i < n; ++i) {
    let newF: string = "";
    for (let j = 0; j < f.length - 1; ++j) {
      const [firstChar, secondChar]: string[] = [f[j], f[j + 1]];

      const charToInsert: string = r[`${firstChar}${secondChar}`];

      if (charToInsert) newF += `${firstChar}${charToInsert}`;
    }
    newF += f[f.length - 1];

    f = newF;
  }

  const counter: { [char: string]: number } = {};
  for (const char of f) counter[char] = ++counter[char] || 1;

  const counts: number[] = Object.values(counter).sort(asc);

  log(f);
  return counts.pop() - counts.shift();
};

log(insertRules(10, formula, rules));
