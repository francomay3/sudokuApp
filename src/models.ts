export type Value = number | null;

export type Input = {
  notes: number[];
  value: Value;
  isPreset: boolean;
};

type Row = [Input, Input, Input, Input, Input, Input, Input, Input, Input];

export type State = [Row, Row, Row, Row, Row, Row, Row, Row, Row];

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
  Expert = "Expert",
  Master = "Master",
}

export type InitialNumbersRow = [
  Value,
  Value,
  Value,
  Value,
  Value,
  Value,
  Value,
  Value,
  Value
];
export type InitialNumbers = [
  InitialNumbersRow,
  InitialNumbersRow,
  InitialNumbersRow,
  InitialNumbersRow,
  InitialNumbersRow,
  InitialNumbersRow,
  InitialNumbersRow,
  InitialNumbersRow,
  InitialNumbersRow
];
