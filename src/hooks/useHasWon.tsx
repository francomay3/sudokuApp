import { useEffect, useState } from "react";

import { State } from "../models";
import {
  checkIfBoardIsFilled,
  checkIfBoardIsValid,
} from "../utils/validationUtils";

const useHasWon = () => {
  const [isBoardFilled, setIsBoardFilled] = useState<boolean>(false);
  const [isBoardValid, setIsBoardValid] = useState<boolean>(true);
  const [hasWon, setHasWon] = useState<boolean>(false);
  useEffect(() => {
    if (isBoardFilled && isBoardValid) {
      setHasWon(true);
    }
  }, [isBoardFilled, isBoardValid]);

  const updateHasWon = (newState: State) => {
    setIsBoardFilled(checkIfBoardIsFilled(newState));
    setIsBoardValid(checkIfBoardIsValid(newState));

    if (checkIfBoardIsFilled(newState) && checkIfBoardIsValid(newState)) {
      setHasWon(true);
    } else {
      setHasWon(false);
    }
  };

  return { hasWon, updateHasWon };
};

export default useHasWon;
