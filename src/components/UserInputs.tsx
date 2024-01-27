import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import styled from "styled-components";

import { SudokuStateManager } from "../hooks/useSudokuStateManager";
import { InputMode } from "../models";

interface UserInputsProps {
  sudokuStateManager: SudokuStateManager;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
  height: 100%;
`;

const UserInputs = ({ sudokuStateManager }: UserInputsProps) => {
  const {
    setCellValue,
    selectedCell,
    toggleInputMode,
    addCellNote,
    inputMode,
    clearCellNotes,
  } = sudokuStateManager;
  return (
    <Grid>
      <ToggleButton
        type="checkbox"
        variant={inputMode === InputMode.Notes ? "success" : "secondary"}
        id="toggle-check"
        checked={inputMode === InputMode.Notes}
        value="1"
        onClick={toggleInputMode}
      >
        Notes {inputMode === InputMode.Notes ? "On" : "Off"}
      </ToggleButton>
      <Button>Undo</Button>
      <Button
        onClick={() => {
          if (!selectedCell) {
            return;
          }
          setCellValue(null);
          clearCellNotes();
        }}
      >
        Erase
      </Button>

      {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
        <Button
          key={number}
          style={{
            fontSize: "2rem",
          }}
          onClick={() => {
            if (!selectedCell) {
              return;
            }
            addCellNote(number);
            setCellValue(number);
          }}
        >
          {number}
        </Button>
      ))}
    </Grid>
  );
};

export default UserInputs;
