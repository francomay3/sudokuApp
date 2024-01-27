import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";

import { SudokuStateManager } from "../hooks/useSudokuStateManager";
import { Difficulty } from "../models";

interface NewGameControlsProps {
  sudokuStateManager: SudokuStateManager;
}
function NewGameControls({ sudokuStateManager }: NewGameControlsProps) {
  const { difficulty, setDifficulty, setNewGame, hasWon } = sudokuStateManager;

  return (
    <Stack gap={2}>
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
      {hasWon && (
        <Alert variant="success">
          <Alert.Heading>Well done!</Alert.Heading>
          <p>You have successfully completed the sudoku puzzle!</p>
        </Alert>
      )}
    </Stack>
  );
}

export default NewGameControls;
