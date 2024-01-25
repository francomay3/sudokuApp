import styled from "styled-components";
import { Value } from "../../models";

const boardLinesColor = "#344861";
const relevantCellsColor = "#e1ebf3";
const selectedCellColor = "#badefb";
const inputTextColor = "#325aaf";

const Cell = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "cellValue",
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
  selected: boolean;
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
  font-size: 130%;
  color: ${({ isPreset }) => (isPreset ? boardLinesColor : inputTextColor)};

  &:hover {
    ${({ selected }) => !selected && `background-color: ${relevantCellsColor};`}
    cursor: ${({ isPreset }) => (isPreset ? "initial" : "pointer")};
    transition: border 0.2s ease-in-out;
  }
`;

export default Cell;
