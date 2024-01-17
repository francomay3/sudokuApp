import flatten from "lodash/flatten";
import { State } from "./models";

const n123 = [1, 2, 3];
const n789 = [7, 8, 9];
const n456 = [4, 5, 6];

const compose =
  (...fns: any[]) =>
  (x: any) =>
    fns.reduceRight((y, f) => f(y), x);

const shiftArrayTimes = (array: any[], times: number) => {
  const shiftedArray = [...array];
  for (let i = 0; i < times; i++) {
    shiftedArray.unshift(shiftedArray.pop());
  }
  return shiftedArray;
};

const bigSquare1 = [n123, n789, n456];
const bigSquare2 = [n456, n123, n789];
const bigSquare3 = [n789, n456, n123];

const bigSquaresRow1 = [bigSquare1, bigSquare2, bigSquare3];
const bigSquaresRow2 = [bigSquare3, bigSquare1, bigSquare2];
const bigSquaresRow3 = [bigSquare2, bigSquare3, bigSquare1];

const bigSquaresToRows = (bigSquaresRow: number[][][]) => {
  const row1 = [
    ...bigSquaresRow[0][0],
    ...bigSquaresRow[1][0],
    ...bigSquaresRow[2][0],
  ];
  const row2 = [
    ...bigSquaresRow[0][1],
    ...bigSquaresRow[1][1],
    ...bigSquaresRow[2][1],
  ];
  const row3 = [
    ...bigSquaresRow[0][2],
    ...bigSquaresRow[1][2],
    ...bigSquaresRow[2][2],
  ];
  return [row1, row2, row3];
};

const initialNumbers: State = [
  ...bigSquaresToRows(bigSquaresRow1),
  ...bigSquaresToRows(bigSquaresRow2).map((row) => shiftArrayTimes(row, 1)),
  ...bigSquaresToRows(bigSquaresRow3).map((row) => shiftArrayTimes(row, 2)),
];

const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

const rotate90 = (rows: any[][]) => {
  const columns: number[][] = [];
  rows.forEach((_row, i) => {
    const column = rows.map((row) => row[i]);
    columns.push(column);
  });
  return columns;
};

const shuffleRows = (numbers: State) =>
  flatten(
    shuffleArray([
      shuffleArray([numbers[0], numbers[1], numbers[2]]),
      shuffleArray([numbers[3], numbers[4], numbers[5]]),
      shuffleArray([numbers[6], numbers[7], numbers[8]]),
    ])
  );

const shuffleRowsAndRotate = (numbers: State) =>
  compose(shuffleRows, rotate90)(numbers);

const shuffleNumbers = (numbers: State) =>
  compose(
    shuffleRowsAndRotate,
    shuffleRowsAndRotate,
    shuffleRowsAndRotate,
    shuffleRowsAndRotate
  )(numbers);

const getRandomSolvedSudoku = () => shuffleNumbers(initialNumbers);

export default getRandomSolvedSudoku;
