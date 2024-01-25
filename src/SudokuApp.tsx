import { Col, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import { Difficulty } from "./models";
import Board from "./components/board/Board";
import UserInputs from "./components/UserInputs";
import useSudokuStateManager from "./hooks/useSudokuStateManager";

function SudokuApp() {
  const sudokuStateManager = useSudokuStateManager();
  const { difficulty, setDifficulty, setNewGame } = sudokuStateManager;

  return (
    <Row>
      <Col xs={12} md={6}>
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
          <Board sudokuStateManager={sudokuStateManager} />
        </Stack>
      </Col>
      <Col xs={12} md={6}>
        <UserInputs />
      </Col>
    </Row>
  );
}

export default SudokuApp;
