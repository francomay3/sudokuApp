import { useEffect, useState } from "react";

import { Difficulty, State, Value, InputMode } from "../models";
import getNewSudoku from "../utils/getNewSudoku";
import {
  getValidatedState,
  checkIfBoardIsFilled,
  checkIfBoardIsValid,
} from "../utils/validationUtils";

const useSudokuStateManager = () => {
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [isBoardFilled, setIsBoardFilled] = useState<boolean>(false);
  const [isBoardValid, setIsBoardValid] = useState<boolean>(true);
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.Value);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    column: number;
  } | null>(null);
  const [state, setState] = useState<State>(getNewSudoku(Difficulty.Easy));

  const setStateHandler = (newState: State) => {
    if (hasWon) {
      return;
    }
    setIsBoardFilled(checkIfBoardIsFilled(newState));
    setIsBoardValid(checkIfBoardIsValid(newState));
    setState(newState);
  };

  useEffect(() => {
    if (isBoardFilled && isBoardValid) {
      setHasWon(true);
    }
  }, [isBoardFilled, isBoardValid]);

  const addCellNote = (value: number) => {
    if (inputMode !== InputMode.Notes || !selectedCell || selectedCellValue) {
      return;
    }
    const newState: State = [...state];
    const cell = newState[selectedCell.row][selectedCell.column];
    const index = cell.notes.indexOf(value);
    if (index === -1) {
      cell.notes.push(value);
    } else {
      cell.notes.splice(index, 1);
    }
    setStateHandler(newState);
  };
  const clearCellNotes = () => {
    if (!selectedCell || selectedCellValue) {
      return;
    }
    const newState: State = [...state];
    const cell = newState[selectedCell.row][selectedCell.column];
    cell.notes = [];
    setStateHandler(newState);
  };
  const cellIsEditable = (row: number, column: number) =>
    !state?.[row]?.[column].isPreset;

  const handleSetSelectedCell = (
    newSelectedCell: {
      row: number;
      column: number;
    } | null
  ) => {
    if (!newSelectedCell) {
      setSelectedCell(null);
      return;
    }
    const { row, column } = newSelectedCell ?? {};
    if (
      selectedCell &&
      selectedCell.row === row &&
      selectedCell.column === column
    ) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ row, column });
    }
  };
  const cellNotes = (row: number, column: number) =>
    state?.[row]?.[column]?.notes ?? [];
  const cellValue = (row: number, column: number) => state[row][column]?.value;
  const selectedCellValue = selectedCell
    ? state[selectedCell.row][selectedCell.column].value
    : null;
  const setCellValue = (newValue: Value) => {
    if (
      !selectedCell ||
      !cellIsEditable(selectedCell.row, selectedCell.column) ||
      inputMode !== InputMode.Value
    ) {
      return;
    }
    const newState = structuredClone(state);
    if (newValue === selectedCellValue) {
      newState[selectedCell.row][selectedCell.column].value = null;
      setStateHandler(getValidatedState(newState));
      return;
    }
    newState[selectedCell.row][selectedCell.column].value = newValue;
    setStateHandler(getValidatedState(newState));
  };
  const setDifficultyAndRestartGame = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    setStateHandler(getNewSudoku(difficulty));
  };
  const setNewGame = () => {
    setIsBoardFilled(false);
    setIsBoardValid(true);
    setHasWon(false);
    setSelectedCell(null);
    setState(getNewSudoku(difficulty));
  };
  const toggleInputMode = () => {
    setInputMode(
      inputMode === InputMode.Value ? InputMode.Notes : InputMode.Value
    );
  };

  const cellHasError = (row: number, column: number) =>
    state[row][column].error;

  return {
    addCellNote,
    cellHasError,
    cellIsEditable,
    cellNotes,
    cellValue,
    clearCellNotes,
    difficulty,
    hasWon,
    inputMode,
    isBoardFilled,
    isBoardValid,
    selectedCell,
    selectedCellValue,
    setCellValue,
    setDifficulty: setDifficultyAndRestartGame,
    setNewGame,
    setSelectedCell: handleSetSelectedCell,
    state,
    toggleInputMode,
  };
};

export default useSudokuStateManager;

export type SudokuStateManager = ReturnType<typeof useSudokuStateManager>;
