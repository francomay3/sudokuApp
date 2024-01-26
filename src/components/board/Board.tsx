import styled from "styled-components";

import { SudokuStateManager } from "../../hooks/useSudokuStateManager";
import { boardLinesColor } from "../../utils/styles";

import Cell from "./Cell";

const Wrapper = styled.div`
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  border: 1px solid ${boardLinesColor};
  border-radius: 0.365rem;
  overflow: hidden;
`;

interface BoardProps {
  sudokuStateManager: SudokuStateManager;
}

const Board = ({ sudokuStateManager }: BoardProps) => {
  const { state, selectedCell } = sudokuStateManager;

  return (
    <Wrapper>
      {state.map((row, rowIndex) =>
        row.map((input, columnIndex) => (
          <Cell
            key={`${rowIndex}-${columnIndex}`}
            column={columnIndex}
            row={rowIndex}
            sudokuStateManager={sudokuStateManager}
            value={input.value}
            isSelected={
              selectedCell?.row === rowIndex &&
              selectedCell?.column === columnIndex
            }
          />
        ))
      )}
    </Wrapper>
  );
};

export default Board;
