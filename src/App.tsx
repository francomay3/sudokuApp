import { Col, Stack } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import { Difficulty, State } from "./models";
import Board from "./Board";
import getRandomSolvedSudoku from "./utils";
import Layout from "./Layout";
import UserInputs from "./UserInputs";

function SudokuApp() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [state, setState] = useState<State>(
    getRandomSolvedSudoku(Difficulty.Easy)
  );

  return (
    <Layout>
      <Row>
        <Col xs={12} md={6}>
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
                    <Dropdown.Item eventKey={difficulty} key={difficulty}>
                      {difficulty}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Stack>
            <Board state={state} />
          </Stack>
        </Col>
        <Col xs={12} md={6}>
          <UserInputs />
        </Col>
      </Row>
    </Layout>
  );
}

export default SudokuApp;
