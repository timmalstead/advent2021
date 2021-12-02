import { readFileSync } from "fs";
import { basename } from "path";

export const add = (firstNum: number, secondNum: number): number =>
  firstNum + secondNum;

export const parseInput = (file: string): string[] =>
  readFileSync(`./input/${basename(file, ".ts")}.txt`)
    .toString()
    .split("\n");
