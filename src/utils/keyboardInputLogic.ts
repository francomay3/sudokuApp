import { SudokuStateManager } from "../hooks/useSudokuStateManager";
import { InputMode } from "../models";

export const keyboardInput = (
  event: KeyboardEvent,
  {
    addCellNote,
    cellIsEditable,
    inputMode,
    selectedCell,
    setCellValue,
    setSelectedCell,
    toggleInputMode,
  }: SudokuStateManager
) => {
  if (!selectedCell) {
    return;
  }
  const { row, column } = selectedCell;
  if (event.key === "ArrowDown") {
    setSelectedCell({
      row: row === 8 ? 0 : row + 1,
      column,
    });
  }
  if (event.key === "ArrowLeft") {
    setSelectedCell({
      row,
      column: column === 0 ? 8 : column - 1,
    });
  }
  if (event.key === "ArrowRight") {
    setSelectedCell({
      row,
      column: column === 8 ? 0 : column + 1,
    });
  }
  if (event.key === "ArrowUp") {
    setSelectedCell({
      row: row === 0 ? 8 : row - 1,
      column,
    });
  }
  if (event.key === "Tab") {
    event.preventDefault();
    toggleInputMode();
  }
  if (cellIsEditable(row, column)) {
    if (inputMode === InputMode.Notes) {
      if (event.key >= "1" && event.key <= "9") {
        addCellNote(Number(event.key));
      }
    }
    if (inputMode === InputMode.Value) {
      if (event.key === "Backspace" || event.key === "Delete") {
        setCellValue(null);
      }
      if (event.key >= "1" && event.key <= "9") {
        setCellValue(Number(event.key));
      }
    }
  }
};
