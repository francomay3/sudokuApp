import styled from "styled-components";
import { State } from "./models";

const shadow = "#dee0f3";
const black = "#303139";

const OuterWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* This makes the wrapper square */
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

const Cell = styled.div<{
  column: number;
  isBottomLeftCorner: boolean;
  isBottomRightCorner: boolean;
  isLeftOnBigSquare: boolean;
  isPreset: boolean;
  isTopLeftCorner: boolean;
  isTopOnBigSquare: boolean;
  isTopRightCorner: boolean;
  row: number;
}>`
  align-items: center;
  background-color: ${(props) => (props.isPreset ? shadow : "transparent")};
  border-bottom-left-radius: ${(props) => (props.isBottomLeftCorner ? 5 : 0)}px;
  border-bottom-right-radius: ${(props) =>
    props.isBottomRightCorner ? 5 : 0}px;
  border-bottom: 1px solid ${black};
  border-left: ${(props) =>
    props.isLeftOnBigSquare ? `1px solid ${black}` : `1px solid transparent`};
  border-right: 1px solid ${black};
  border-top-left-radius: ${(props) => (props.isTopLeftCorner ? 5 : 0)}px;
  border-top-right-radius: ${(props) => (props.isTopRightCorner ? 5 : 0)}px;
  border-top: ${(props) =>
    props.isTopOnBigSquare ? `1px solid ${black}` : `1px solid transparent`};
  display: flex;
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
  justify-content: center;

  &:hover {
    background-color: ${shadow};
    cursor: pointer;
    transition: border 0.2s ease-in-out;
  }
`;

interface BoardProps {
  state: State;
}
const Board = ({ state }: BoardProps) => {
  return (
    <OuterWrapper>
      <InnerWrapper>
        {state.map((row, rowIndex) =>
          row.map((input, columnIndex) => (
            <Cell
              column={columnIndex + 1}
              isBottomLeftCorner={rowIndex === 8 && columnIndex === 0}
              isBottomRightCorner={rowIndex === 8 && columnIndex === 8}
              isLeftOnBigSquare={columnIndex % 3 === 0}
              isPreset={input.isPreset}
              isTopLeftCorner={rowIndex === 0 && columnIndex === 0}
              isTopOnBigSquare={rowIndex % 3 === 0}
              isTopRightCorner={rowIndex === 0 && columnIndex === 8}
              key={`${rowIndex}-${columnIndex}`}
              row={rowIndex + 1}
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
