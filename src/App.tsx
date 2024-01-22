import { useState } from "react";
import styled from "styled-components";
import { Difficulty, State } from "./models";
import getRandomSolvedSudoku from "./utils";

const shadow = "#dee0f3";
const black = "#303139";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid ${black};
  color: ${black};
  font-size: 20px;
  padding: 10px 20px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${shadow};
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
`;

const Grid = styled.div`
  border-collapse: collapse;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  height: 500px;
  width: 500px;
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

function SudokuApp() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [state, setState] = useState<State>(
    getRandomSolvedSudoku(Difficulty.Easy)
  );

  return (
    <Wrapper>
      <Grid>
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
      </Grid>
      <Button onClick={() => setState(getRandomSolvedSudoku(difficulty))}>
        New {difficulty} Game
      </Button>
      <Button onClick={() => setDifficulty(Difficulty.Easy)}>Easy</Button>
      <Button onClick={() => setDifficulty(Difficulty.Medium)}>Medium</Button>
      <Button onClick={() => setDifficulty(Difficulty.Hard)}>Hard</Button>
      <Button onClick={() => setDifficulty(Difficulty.Expert)}>Expert</Button>
      <Button onClick={() => setDifficulty(Difficulty.Master)}>Master</Button>
    </Wrapper>
  );
}

export default SudokuApp;
