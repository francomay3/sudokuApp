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
import { InputMode } from "./models";

const Wrapper = styled(Row)`
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
    max-height: calc(100vh - 3rem);
  }
`;

function SudokuApp() {
  const sudokuStateManager = useSudokuStateManager();
  const {
    addCellNote,
    cellIsEditable,
    inputMode,
    selectedCell,
    setCellValue,
    setSelectedCell,
    toggleInputMode,
  } = sudokuStateManager;

  const handleKeyDown = (event: KeyboardEvent) => {
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
          addCellNote(row, column, Number(event.key));
        }
      }
      if (inputMode === InputMode.Value) {
        if (event.key === "Backspace" || event.key === "Delete") {
          setCellValue(row, column, null);
        }
        if (event.key >= "1" && event.key <= "9") {
          setCellValue(row, column, Number(event.key));
        }
      }
    }
  };

  useKeyPress(handleKeyDown);
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
