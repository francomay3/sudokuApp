# Sudoku App

Welcome to Sudoku App, a fun and interactive way to play sudoku puzzles on your browser. Sudoku App is built with vite, react, typescript, and lodash. It lets you generate new solved sudokus, fill them in the app, and check for mistakes in real time. Sudoku App is still under development, so some of these features are not available yet. You can find more information about the app below.

## Key Features

- Sudoku Generation: Create new, solved sudoku puzzles with varying levels of difficulty.
- Interactive Gameplay: Fill in the sudoku puzzles directly within the app.
- Note-Taking: Utilize cell notes to assist in solving the puzzles.
- Real-Time Error Checking: Instantly identify mistakes with a color-coded feedback system.
- Puzzle Management: Reset or clear puzzles at your convenience.
- Progress Saving: (Coming Soon) Save and load your progress using local storage.
- History Tracking: Keep track of your moves and undo steps during gameplay.
- Board Color Scheme Changes: The color scheme for the board toggles between green and blue, indicating the input mode (notes or values) for a more intuitive solving experience.

## Installation

1. Install the `@francomay3/sudoku` package with the command:

```bash
npm i @francomay3/sudoku
```

2. After installation, import and use the component in your application as shown below:

```javascript
import Sudoku from "@francomay3/sudoku";

function App() {
  return <Sudoku />;
}

export default App;
```

## Usage

To interact with the Sudoku board, you can use the input buttons located either on the left side or beneath the board (for mobile users) or more conveniently use your keyboard to move the cell selection around and input new values. To fill a cell, simply select it and input a value. If you wish to remove a value, you can either input the same value again or use the erase button. The 'Backspace' or 'Delete' keys on your keyboard can also be used for this purpose.
<br>
<br>
For adding notes, you'll need to switch to the 'Notes' mode. This can be done by clicking on the 'Notes' button or by pressing the 'Tab' key. Once in 'Notes' mode, select a cell and input a number or choose one from the input buttons to add a note. To remove a note, simply press the same number again.
<br>
<br>
To return to the 'Fill Values' mode, you can either press the 'Tab' key or click on the 'Notes' button once more.
<br>
<br>
To start a new game at any time, you can choose the desired difficulty by pressing on the difficulty buttons or the "New Game" button. The button corresponding to the currently active difficulty will be highlighted. This allows you to easily switch between different difficulty levels and start a fresh game whenever you want.
