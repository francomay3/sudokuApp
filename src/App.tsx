import { useState } from "react";
import styled from "styled-components";
import { State } from "./models";
import getRandomSolvedSudoku from "./utils";

const shadow = "#dee0f3";
const black = "#303139";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid ${black};
  background-color: transparent;
  color: ${black};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${shadow};
    transition: background-color 0.2s ease-in-out;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  height: 500px;
  width: 500px;
  border-collapse: collapse;
c`;

const Cell = styled.div<{
  isLeftOnBigSquare: boolean;
  isTopOnBigSquare: boolean;
  isTopLeftCorner: boolean;
  isTopRightCorner: boolean;
  isBottomLeftCorner: boolean;
  isBottomRightCorner: boolean;
  column: number;
  row: number;
}>`
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
  border-left: ${(props) =>
    props.isLeftOnBigSquare ? `1px solid ${black}` : `1px solid transparent`};
  border-top: ${(props) =>
    props.isTopOnBigSquare ? `1px solid ${black}` : `1px solid transparent`};
  border-top-left-radius: ${(props) => (props.isTopLeftCorner ? 5 : 0)}px;
  border-top-right-radius: ${(props) => (props.isTopRightCorner ? 5 : 0)}px;
  border-bottom-left-radius: ${(props) => (props.isBottomLeftCorner ? 5 : 0)}px;
  border-bottom-right-radius: ${(props) =>
    props.isBottomRightCorner ? 5 : 0}px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${black};
  border-right: 1px solid ${black};

  &:hover {
    cursor: pointer;
    background-color: ${shadow};
    transition: border 0.2s ease-in-out;
  }
`;

function SudokuApp() {
  const [state, setState] = useState<State>(getRandomSolvedSudoku());

  return (
    <Wrapper>
      <Grid>
        {state.map((row, rowIndex) =>
          row.map((number, columnIndex) => (
            <Cell
              key={`${rowIndex}-${columnIndex}`}
              isLeftOnBigSquare={columnIndex % 3 === 0}
              isTopOnBigSquare={rowIndex % 3 === 0}
              isTopLeftCorner={rowIndex === 0 && columnIndex === 0}
              isTopRightCorner={rowIndex === 0 && columnIndex === 8}
              isBottomLeftCorner={rowIndex === 8 && columnIndex === 0}
              isBottomRightCorner={rowIndex === 8 && columnIndex === 8}
              column={columnIndex + 1}
              row={rowIndex + 1}
            >
              {number}
            </Cell>
          ))
        )}
      </Grid>
      <Button onClick={() => setState(getRandomSolvedSudoku())}>
        Shuffle board!
      </Button>
    </Wrapper>
  );
}

export default SudokuApp;
