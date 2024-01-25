import styled from "styled-components";
import useClickAway from "../../hooks/useClickAway";
import useKeyPress from "../../hooks/useKeyPressed";
import { SudokuStateManager } from "../../hooks/useSudokuStateManager";
import Cell from "./Cell";

const OuterWrapper = styled.div`
  padding-bottom: 100%;
  position: relative;
  width: 100%;
`;

const InnerWrapper = styled.div`
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

interface BoardProps {
  sudokuStateManager: SudokuStateManager;
}

const Board = ({ sudokuStateManager }: BoardProps) => {
  const {
    selectedCell,
    selectedCellValue,
    setSelectedCell,
    setCellValue,
    cellIsEditable,
    state,
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
    if (cellIsEditable(row, column)) {
      if (event.key === "Backspace") {
        setCellValue(row, column, null);
      }
      if (event.key >= "1" && event.key <= "9") {
        setCellValue(row, column, Number(event.key));
      }
    }
  };

  useKeyPress(handleKeyDown);
  const ref = useClickAway(() => setSelectedCell(null));

  return (
    <OuterWrapper ref={ref}>
      <InnerWrapper>
        {state.map((row, rowIndex) =>
          row.map((input, columnIndex) => (
            <Cell
              isSelectionInBigSquare={Boolean(
                selectedCell &&
                  selectedCell.row >= rowIndex - (rowIndex % 3) &&
                  selectedCell.row <= rowIndex + (2 - (rowIndex % 3)) &&
                  selectedCell.column >= columnIndex - (columnIndex % 3) &&
                  selectedCell.column <= columnIndex + (2 - (columnIndex % 3))
              )}
              column={columnIndex + 1}
              isBottomLeftCorner={rowIndex === 8 && columnIndex === 0}
              isBottomRightCorner={rowIndex === 8 && columnIndex === 8}
              isLeftOnBigSquare={columnIndex % 3 === 0}
              isPreset={input.isPreset}
              isTopLeftCorner={rowIndex === 0 && columnIndex === 0}
              isTopOnBigSquare={rowIndex % 3 === 0}
              isTopRightCorner={rowIndex === 0 && columnIndex === 8}
              key={`${rowIndex}-${columnIndex}`}
              onClick={() =>
                setSelectedCell({ row: rowIndex, column: columnIndex })
              }
              row={rowIndex + 1}
              selected={Boolean(
                selectedCell &&
                  selectedCell.row === rowIndex &&
                  selectedCell.column === columnIndex
              )}
              selectedValue={selectedCellValue}
              cellValue={input.value}
              selectedColumn={selectedCell?.column === columnIndex}
              selectedRow={selectedCell?.row === rowIndex}
            >
              {input.value}
            </Cell>
          ))
        )}
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default Board;
