import { useState, useEffect } from "react";

import { State } from "../models";

const useHistory = ({
  setState,
  updateHasWon,
  hasWon,
  initialSudokuState,
}: {
  setState: (newState: State) => void;
  updateHasWon: (newState: State) => void;
  hasWon: boolean;
  initialSudokuState: State;
}) => {
  const [history, setHistory] = useState<State[]>([]);

  useEffect(() => {
    addToHistory(initialSudokuState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToHistory = (newState: State) => {
    const newHistory = [...structuredClone(history), newState];
    setHistory(newHistory);
  };

  const undoHistory = () => {
    if (hasWon) {
      return;
    }

    const newHistory = structuredClone(history);
    if (newHistory.length === 1) {
      return;
    }

    const previousState = newHistory[newHistory.length - 2];
    newHistory.pop();
    setState(previousState);
    updateHasWon(previousState);
    setHistory(newHistory);
  };

  return { addToHistory, setHistory, undoHistory };
};

export default useHistory;
