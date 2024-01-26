import { Input, Row, State } from "../models";
import { compose, rotate90 } from "./getNewSudoku";

type TransformState = (state: State) => State;
const checkRow: (tRow: Row) => Row = (tRow) => {
  const values = tRow.map(({ value }) => value);
  values.forEach((value, i) => {
    const isValueDuplicated = values.filter((v) => v && v === value).length > 1;
    if (isValueDuplicated) {
      tRow[i].error = true;
    }
  });
  return tRow;
};

const checkRows: TransformState = (state) => {
  state.forEach((row, i) => {
    state[i] = checkRow(row);
  });
  return state;
};

const checkLines: TransformState = (state) =>
  compose(checkRows, rotate90, checkRows, rotate90)(state);

const checkBigSquares: TransformState = (state) => {
  const bigSquares: Input[][] = [];
  for (let i = 0; i < 9; i++) {
    bigSquares.push([]);
  }
  state.forEach((row, i) => {
    row.forEach((cell, j) => {
      const bigSquareIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      bigSquares[bigSquareIndex].push(cell);
    });
  });
  bigSquares.forEach((bigSquare) => {
    const values = bigSquare.map(({ value }) => value);
    values.forEach((value, i) => {
      const isValueDuplicated =
        values.filter((v) => v && v === value).length > 1;
      if (isValueDuplicated) {
        bigSquare[i].error = true;
      }
    });
  });
  return state;
};

const clearErrors = (state: State) => {
  const newState = structuredClone(state);
  newState.forEach((row) => {
    row.forEach((cell) => {
      cell.error = false;
    });
  });
  return newState;
};

export const getValidatedState: TransformState = (state) =>
  compose(checkLines, checkBigSquares, clearErrors)(state);
