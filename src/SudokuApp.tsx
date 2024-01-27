import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import styled from "styled-components";

import Board from "./components/board/Board";
import NewGameControls from "./components/NewGameControls";
import UserInputs from "./components/UserInputs";
import useClickAway from "./hooks/useClickAway";
import useKeyPress from "./hooks/useKeyPressed";
import useSudokuStateManager from "./hooks/useSudokuStateManager";
import { keyboardInput } from "./utils/keyboardInputLogic";

const Wrapper = styled(Row)`
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

function SudokuApp() {
  const sudokuStateManager = useSudokuStateManager();
  const { setSelectedCell } = sudokuStateManager;

  useKeyPress((e) => keyboardInput(e, sudokuStateManager));
  const ref = useClickAway(() => setSelectedCell(null));

  return (
    <Container>
      <Wrapper ref={ref}>
        <Col xs={12} md={6}>
          <Stack gap={2}>
            <NewGameControls sudokuStateManager={sudokuStateManager} />
            <Board sudokuStateManager={sudokuStateManager} />
          </Stack>
        </Col>
        <Col xs={12} md={6}>
          <UserInputs sudokuStateManager={sudokuStateManager} />
        </Col>
      </Wrapper>
    </Container>
  );
}

export default SudokuApp;
