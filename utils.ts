import { readFileSync } from "fs";
import { basename } from "path";

export const add = (firstNum: number, secondNum: number): number =>
  firstNum + secondNum;

export const loadInput = (file: string): string =>
  readFileSync(`./input/${basename(file, ".ts")}.txt`).toString();

export const parseInput = (file: string): string[] =>
  loadInput(file).split("\n");
