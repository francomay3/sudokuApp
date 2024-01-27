import styled from "styled-components";

import { SudokuStateManager } from "../../hooks/useSudokuStateManager";
import { Value } from "../../models";
import {
  boardLinesColor,
  errorBackgroundColor,
  errorTextColor,
  inputTextColor,
  relevantCellsColor,
  selectedCellColor,
} from "../../utils/styles";

type WrapperProps = {
  column: number;
  hasError: boolean;
  isInLineOfSelectedCell: boolean;
  isSameValueAsSelectedCell: boolean;
  isSelected: boolean;
  isSelectedCellInBigSquare: boolean;
  row: number;
  selectedCellIsEditable: boolean | null;
};

const getBackgroundColor = ({
  hasError,
  isInLineOfSelectedCell,
  isSameValueAsSelectedCell,
  isSelected,
  isSelectedCellInBigSquare,
}: WrapperProps) => {
  if (hasError) {
    return errorBackgroundColor;
  }
  if (isSelected || isSameValueAsSelectedCell) {
    return selectedCellColor;
  }
  if (isInLineOfSelectedCell || isSelectedCellInBigSquare) {
    return relevantCellsColor;
  }
  return "white";
};

const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "hasError",
      "isInLineOfSelectedCell",
      "isSameValueAsSelectedCell",
      "isSelected",
      "isSelectedCellInBigSquare",
      "selectedCellIsEditable",
    ].includes(prop),
})<WrapperProps>`
  background-color: ${(props) => getBackgroundColor(props)};
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border-left: 1px solid ${boardLinesColor};
  border-top: 1px solid ${boardLinesColor};
  ${({ row }) =>
    row % 3 === 2 ? `border-bottom: 1px solid ${boardLinesColor};` : ""}
  ${({ column }) =>
    column % 3 === 2 ? `border-right: 1px solid ${boardLinesColor};` : ""}
  ${({ row }) => row === 0 && "border-top: unset;"}
  ${({ column }) => column === 0 && "border-left: unset;"}
  ${({ row }) => row === 8 && "border-bottom: unset;"}
  ${({ column }) => column === 8 && "border-right: unset;"}

  cursor: pointer;
  user-select: none;
`;

const ValueWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isEditable", "hasError"].includes(prop),
})<{
  isEditable: boolean;
  hasError: boolean;
}>`
  color: ${({ isEditable, hasError }) =>
    isEditable ? (hasError ? errorTextColor : inputTextColor) : "initial"};
  align-items: center;
  display: flex;
  font-size: 130%;
  grid-column: 1 / 4;
  grid-row: 1 / 4;
  justify-content: center;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoteWrapper = styled.div<{ note: number }>`
  ${({ note }) => {
    if ([1, 2, 3].includes(note)) {
      return `
        grid-row: 1;
        grid-column: ${note};
      `;
    }
    if ([4, 5, 6].includes(note)) {
      return `
        grid-row: 2;
        grid-column: ${note - 3};
      `;
    }
    if ([7, 8, 9].includes(note)) {
      return `
        grid-row: 3;
        grid-column: ${note - 6};
      `;
    }
  }}
  align-items: center;
  display: flex;
  font-size: 85%;
  justify-content: center;
  line-height: 0;
`;

interface CellProps {
  sudokuStateManager: SudokuStateManager;
  row: number;
  column: number;
  value: Value;
  isSelected: boolean;
}

const Cell = ({
  isSelected,
  sudokuStateManager,
  row,
  column,
  value,
}: CellProps) => {
  const {
    cellHasError,
    cellIsEditable,
    cellNotes,
    selectedCell,
    selectedCellValue,
    setSelectedCell,
  } = sudokuStateManager;

  const selectedCellIsEditable =
    selectedCell && cellIsEditable(selectedCell.row, selectedCell.column);

  const isSelectedCellInBigSquare = Boolean(
    selectedCell &&
      Math.floor(selectedCell.row / 3) === Math.floor(row / 3) &&
      Math.floor(selectedCell.column / 3) === Math.floor(column / 3)
  );

  const isInLineOfSelectedCell = Boolean(
    selectedCell && (row === selectedCell.row || column === selectedCell.column)
  );

  const isSameValueAsSelectedCell = Boolean(
    value && value === selectedCellValue
  );

  const hasError = cellHasError(row, column);

  return (
    <Wrapper
      hasError={hasError}
      selectedCellIsEditable={selectedCellIsEditable}
      isSelectedCellInBigSquare={isSelectedCellInBigSquare}
      row={row}
      column={column}
      onClick={() => setSelectedCell({ row, column })}
      isSelected={isSelected}
      isInLineOfSelectedCell={isInLineOfSelectedCell}
      isSameValueAsSelectedCell={isSameValueAsSelectedCell}
    >
      {value ? (
        <ValueWrapper
          isEditable={cellIsEditable(row, column)}
          hasError={hasError}
        >
          {value}
        </ValueWrapper>
      ) : (
        cellNotes(row, column).map((note) => (
          <NoteWrapper key={note} note={note}>
            {note}
          </NoteWrapper>
        ))
      )}
    </Wrapper>
  );
};

export default Cell;
