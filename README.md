# Sudoku App

Welcome to Sudoku App, a fun and interactive way to play sudoku puzzles on your browser. Sudoku App is built with vite, react, typescript, lodash and bootstrap. It lets you generate new solved sudokus, fill them in the app, and check for mistakes in real time. Sudoku App is still under development, so some of these features are not available yet. You can find more information about the app below.

## Key Features

- Sudoku Generation: Create new, solved sudoku puzzles with varying levels of difficulty.
- Interactive Gameplay: Fill in the sudoku puzzles directly within the app.
- Note-Taking: Utilize cell notes to assist in solving the puzzles.
- Real-Time Error Checking: (Coming Soon) Instantly identify mistakes with a color-coded feedback system.
- Puzzle Management: Reset or clear puzzles at your convenience.
- Progress Saving: (Coming Soon) Save and load your progress using local storage.

## Installation

1. Ensure `react-bootstrap` is installed for proper functioning of this component. If not, install it using the following command:

```bash
npm i react-bootstrap
```

2. Install the `@francomay3/sudoku` package with the command:

```bash
npm i @francomay3/sudoku
```

3. After installation, import and use the component in your application as shown below:

```javascript
import "bootstrap/dist/css/bootstrap.min.css";
import Sudoku from "@francomay3/sudoku";

function App() {
  return <Sudoku />;
}

export default App;
```

## Usage

To interact with the Sudoku board, you can use the input buttons located either on the left side or beneath the board (for mobile users). To fill a cell, simply select it and input a value. If you wish to remove a value, you can either input the same value again or use the erase button. The 'Backspace' or 'Delete' keys on your keyboard can also be used for this purpose.
<br>
For adding notes, you'll need to switch to the 'Notes' mode. This can be done by clicking on the 'Notes' button or by pressing the 'Tab' key. Once in 'Notes' mode, select a cell and input a number or choose one from the input buttons to add a note. To remove a note, simply press the same number again.
<br>
To return to the 'Fill Values' mode, you can either press the 'Tab' key or click on the 'Notes' button once more.

### Thank you Bing Chat for writing this README for me
