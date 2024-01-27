import styled from "styled-components";

import { SudokuStateManager } from "../hooks/useSudokuStateManager";
import { Difficulty } from "../models";
import { mobileBreakpoint } from "../utils/styles";

import Button from "./Button";

const Difficulties = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-evenly;

  @media (max-width: ${mobileBreakpoint}) {
    & > button {
      padding-inline: 0.5rem;
    }
  }
`;

interface NewGameControlsProps {
  sudokuStateManager: SudokuStateManager;
}
function NewGameControls({ sudokuStateManager }: NewGameControlsProps) {
  const { difficulty, setNewGame, hasWon } = sudokuStateManager;

  return (
    <>
      <Button onClick={() => setNewGame(difficulty)}>New Game</Button>
      <Difficulties>
        {Object.values(Difficulty).map((d) => (
          <Button
            active={d === difficulty}
            key={d}
            onClick={() => setNewGame(d)}
          >
            {d}
          </Button>
        ))}
      </Difficulties>

      {hasWon && <p>You have successfully completed the sudoku puzzle!</p>}
    </>
  );
}

export default NewGameControls;
