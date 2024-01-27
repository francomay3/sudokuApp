import styled from "styled-components";

import Board from "./components/board/Board";
import NewGameControls from "./components/NewGameControls";
import UserInputs from "./components/UserInputs";
import useClickAway from "./hooks/useClickAway";
import useKeyPress from "./hooks/useKeyPressed";
import useSudokuStateManager from "./hooks/useSudokuStateManager";
import { keyboardInput } from "./utils/keyboardInputLogic";
import { mobileBreakpoint } from "./utils/styles";

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;

  & * {
    font-family: "Roboto", arial, sans-serif;
  }

  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  gap: 0.5rem;
`;

function SudokuApp() {
  const sudokuStateManager = useSudokuStateManager();
  const { setSelectedCell } = sudokuStateManager;

  useKeyPress((e) => keyboardInput(e, sudokuStateManager));
  const ref = useClickAway(() => setSelectedCell(null));

  return (
    <Wrapper ref={ref}>
      <Col>
        <NewGameControls sudokuStateManager={sudokuStateManager} />
        <Board sudokuStateManager={sudokuStateManager} />
      </Col>
      <Col>
        <UserInputs sudokuStateManager={sudokuStateManager} />
      </Col>
    </Wrapper>
  );
}

export default SudokuApp;
