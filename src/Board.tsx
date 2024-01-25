import styled from "styled-components";
import { State, Value } from "./models";
import { useState } from "react";
import useClickAway from "./hooks/useClickAway";

const relevantCellsColor = "#e1ebf3";
const selectedCellColor = "#badefb";
const boardLinesColor = "#344861";

const OuterWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

const InnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
`;

const Cell = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "column",
      "isBottomLeftCorner",
      "isBottomRightCorner",
      "isLeftOnBigSquare",
      "isPreset",
      "isSelectionInBigSquare",
      "isTopLeftCorner",
      "isTopOnBigSquare",
      "isTopRightCorner",
      "row",
      "selected",
      "selectedColumn",
      "selectedRow",
      "selectedValue",
      "value",
    ].includes(prop),
})<{
  column: number;
  isBottomLeftCorner: boolean;
  isBottomRightCorner: boolean;
  isLeftOnBigSquare: boolean;
  isPreset: boolean;
  isSelectionInBigSquare: boolean;
  isTopLeftCorner: boolean;
  isTopOnBigSquare: boolean;
  isTopRightCorner: boolean;
  row: number;
  selected: [number, number, Value] | null;
  selectedColumn: boolean;
  selectedRow: boolean;
  selectedValue: Value;
  cellValue: Value;
}>`
  align-items: center;

  background-color: ${({
    selectedRow,
    selectedColumn,
    isSelectionInBigSquare,
    cellValue,
    selectedValue,
    selected,
  }) => {
    if ((cellValue && selectedValue === cellValue) || selected) {
      return selectedCellColor;
    }
    if (selectedRow || selectedColumn) {
      return relevantCellsColor;
    }
    if (isSelectionInBigSquare) {
      return relevantCellsColor;
    }
    return "transparent";
  }};
  border-bottom-left-radius: ${({ isBottomLeftCorner }) =>
    isBottomLeftCorner ? 5 : 0}px;
  border-bottom-right-radius: ${({ isBottomRightCorner }) =>
    isBottomRightCorner ? 5 : 0}px;
  border-bottom: 1px solid ${boardLinesColor};
  border-left: ${({ isLeftOnBigSquare }) =>
    isLeftOnBigSquare
      ? `1px solid ${boardLinesColor}`
      : `1px solid transparent`};
  border-right: 1px solid ${boardLinesColor};
  border-top-left-radius: ${({ isTopLeftCorner }) =>
    isTopLeftCorner ? 5 : 0}px;
  border-top-right-radius: ${({ isTopRightCorner }) =>
    isTopRightCorner ? 5 : 0}px;
  border-top: ${({ isTopOnBigSquare }) =>
    isTopOnBigSquare
      ? `1px solid ${boardLinesColor}`
      : `1px solid transparent`};
  display: flex;
  grid-column: ${({ column }) => column};
  grid-row: ${({ row }) => row};
  justify-content: center;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;

  &:hover {
    ${({ selected }) => !selected && `background-color: ${relevantCellsColor};`}
    cursor: ${({ isPreset }) => (isPreset ? "initial" : "pointer")};
    transition: border 0.2s ease-in-out;
  }
`;

interface BoardProps {
  state: State;
}
const Board = ({ state }: BoardProps) => {
  const [selectedCell, setSelectedCell] = useState<
    [number, number, Value] | null
  >(null);

  const ref = useClickAway(() => setSelectedCell(null));

  return (
    <OuterWrapper ref={ref}>
      <InnerWrapper>
        {state.map((row, rowIndex) =>
          row.map((input, columnIndex) => (
            <Cell
              isSelectionInBigSquare={Boolean(
                selectedCell &&
                  selectedCell[0] >= rowIndex - (rowIndex % 3) &&
                  selectedCell[0] <= rowIndex + (2 - (rowIndex % 3)) &&
                  selectedCell[1] >= columnIndex - (columnIndex % 3) &&
                  selectedCell[1] <= columnIndex + (2 - (columnIndex % 3))
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
                setSelectedCell([rowIndex, columnIndex, input.value])
              }
              row={rowIndex + 1}
              selected={
                selectedCell &&
                selectedCell[0] === rowIndex &&
                selectedCell[1] === columnIndex
                  ? selectedCell
                  : null
              }
              selectedValue={selectedCell && selectedCell[2]}
              cellValue={input.value}
              selectedColumn={selectedCell?.[1] === columnIndex}
              selectedRow={selectedCell?.[0] === rowIndex}
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
