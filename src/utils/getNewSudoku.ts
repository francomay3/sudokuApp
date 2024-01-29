import { State, Input, Value, Difficulty } from "../models";

import * as initialValues from "./initialValues";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;

export const compose =
  (...fns: Func[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (x: any) =>
    fns.reduceRight((y, f) => f(y), x);

type List<T> = T[] | null | undefined;
type Many<T> = T | T[];
function flatten<T>(array: List<Many<T>>): T[] {
  if (!array) {
    return [];
  }

  return array.reduce((acc: T[], val: Many<T>) => {
    return acc.concat(Array.isArray(val) ? val : [val]);
  }, []);
}

export const createInput: (value: Value) => Input = (value) => ({
  error: false,
  isPreset: !!value,
  notes: [],
  value,
});

const numbersToState = (numbers: Value[][]): State =>
  numbers.map((row) =>
    row.map((value) => {
      return createInput(value);
    })
  ) as State;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

export const rotate90: (state: State) => State = (rows: State) => {
  const columns: Input[][] = [];
  rows.forEach((_row, i) => {
    const column = rows.map((row) => row[i]);
    columns.push(column);
  });
  return columns as State;
};

const shuffleRows: (numbers: State) => State = (numbers) =>
  flatten(
    shuffleArray([
      shuffleArray([numbers[0], numbers[1], numbers[2]]),
      shuffleArray([numbers[3], numbers[4], numbers[5]]),
      shuffleArray([numbers[6], numbers[7], numbers[8]]),
    ])
  ) as State;

const shuffleRowsAndRotate = (numbers: State) =>
  compose(shuffleRows, rotate90)(numbers);

const shuffleNumbers: (numbers: State) => State = (numbers) =>
  compose(
    shuffleRowsAndRotate,
    shuffleRowsAndRotate,
    shuffleRowsAndRotate,
    shuffleRowsAndRotate
  )(numbers);

const getRandomSolvedSudoku = (difficulty: Difficulty) =>
  compose(shuffleNumbers, numbersToState)(initialValues[difficulty]);

export default getRandomSolvedSudoku;
