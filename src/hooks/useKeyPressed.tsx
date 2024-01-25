import { useEffect } from "react";

type HandleKeyDown = (event: KeyboardEvent) => void;

const useKeyPress = (handleKeyDown: HandleKeyDown) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useKeyPress;
