import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/Stack";

import { SudokuStateManager } from "../hooks/useSudokuStateManager";
import { Difficulty } from "../models";

interface NewGameControlsProps {
  sudokuStateManager: SudokuStateManager;
}
function NewGameControls({ sudokuStateManager }: NewGameControlsProps) {
  const { difficulty, setDifficulty, setNewGame } = sudokuStateManager;

  return (
    <Stack direction="horizontal" gap={2}>
      <Button onClick={setNewGame}>New Game</Button>
      <Dropdown
        onSelect={(difficulty) => {
          setDifficulty(difficulty as Difficulty);
        }}
      >
        <Dropdown.Toggle>{difficulty}</Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.values(Difficulty).map((difficulty) => (
            <Dropdown.Item eventKey={difficulty} key={difficulty}>
              {difficulty}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
}

export default NewGameControls;
