import { useState, useRef } from "react";

import { Difficulty, State, Value, InputMode } from "../models";
import getNewSudoku from "../utils/getNewSudoku";
import { getValidatedState } from "../utils/validationUtils";

import useHasWon from "./useHasWon";
import useHistory from "./useHistory";

const useSudokuStateManager = () => {
  const initialSudokuState = useRef<State>(
    getNewSudoku(Difficulty.Easy)
  ).current;

  const { hasWon, updateHasWon } = useHasWon();

  const [inputMode, setInputMode] = useState<InputMode>(InputMode.Value);

  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [state, setState] = useState<State>(initialSudokuState);
  const { addToHistory, setHistory, undoHistory } = useHistory({
    hasWon,
    updateHasWon,
    setState,
    initialSudokuState,
  });

  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    column: number;
  } | null>(null);

  const setStateHandler = (newState: State) => {
    if (hasWon) {
      return;
    }
    addToHistory(newState);
    updateHasWon(newState);
    setState(newState);
  };

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
    setSelectedCell({ row, column });
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

  const setNewGame = (diff: Difficulty) => {
    const newState = getNewSudoku(diff);
    setDifficulty(diff);
    updateHasWon(newState);
    setSelectedCell(null);
    setHistory([newState]);
    setState(newState);
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
    selectedCell,
    selectedCellValue,
    setCellValue,
    setNewGame,
    setSelectedCell: handleSetSelectedCell,
    state,
    toggleInputMode,
    undoHistory,
  };
};

export default useSudokuStateManager;

export type SudokuStateManager = ReturnType<typeof useSudokuStateManager>;
