import { useState } from "react";
import getNewSudoku from "../utils/getNewSudoku";
import { Difficulty, State, Value, InputMode } from "../models";

const useSudokuStateManager = () => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.Value);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    column: number;
  } | null>(null);
  const [state, setState] = useState<State>(getNewSudoku(Difficulty.Easy));
  const addCellNote = (row: number, column: number, value: number) => {
    const newState: State = [...state];
    const cell = newState[row][column];
    const index = cell.notes.indexOf(value);
    if (index === -1) {
      cell.notes.push(value);
    } else {
      cell.notes.splice(index, 1);
    }
    setState(newState);
  };
  const cellIsEditable = (row: number, column: number) =>
    !state[row][column].isPreset;
  const cellNotes = (row: number, column: number) => state[row][column].notes;
  const cellValue = (row: number, column: number) => state[row][column].value;
  const selectedCellValue = selectedCell
    ? state[selectedCell.row][selectedCell.column].value
    : null;
  const setCellValue = (row: number, column: number, value: Value) => {
    const newState: State = [...state];
    newState[row][column].value = value;
    setState(newState);
  };
  const setDifficultyAndRestartGame = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    setState(getNewSudoku(difficulty));
  };
  const setNewGame = () => {
    setState(getNewSudoku(difficulty));
  };

  return {
    addCellNote,
    cellIsEditable,
    cellNotes,
    cellValue,
    difficulty,
    inputMode,
    selectedCell,
    selectedCellValue,
    setCellValue,
    setDifficulty: setDifficultyAndRestartGame,
    setInputMode,
    setNewGame,
    setSelectedCell,
    state,
  };
};

export default useSudokuStateManager;

export type SudokuStateManager = ReturnType<typeof useSudokuStateManager>;
