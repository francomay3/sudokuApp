import { useState } from "react";
import { Difficulty, State } from "./models";
import getRandomSolvedSudoku from "./utils";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/Stack";
import Board from "./Board";
import Layout from "./Layout";
import UserInputs from "./UserInputs";

function SudokuApp() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [state, setState] = useState<State>(
    getRandomSolvedSudoku(Difficulty.Easy)
  );

  return (
    <Layout>
      <Stack direction="horizontal" gap={2}>
        <Stack gap={2}>
          <Stack direction="horizontal" gap={2}>
            <Button
              onClick={() => {
                setState(getRandomSolvedSudoku(difficulty));
              }}
            >
              New Game
            </Button>
            <Dropdown
              onSelect={(difficulty) => {
                setDifficulty(difficulty as Difficulty);
                setState(getRandomSolvedSudoku(difficulty as Difficulty));
              }}
            >
              <Dropdown.Toggle>{difficulty}</Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.values(Difficulty).map((difficulty) => (
                  <Dropdown.Item eventKey={difficulty}>
                    {difficulty}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
          <Board state={state} />
        </Stack>
        <UserInputs />
      </Stack>
    </Layout>
  );
}

export default SudokuApp;
