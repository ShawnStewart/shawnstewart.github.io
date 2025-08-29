import { CellTile } from './CellTile';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useSudokuContext } from './SudokuContext';

export function GameBoard() {
  useKeyboardControls();

  const { state, setFocusedCell } = useSudokuContext();

  return (
    <div className="grid-cols-sudoku grid-rows-sudoku grid aspect-square w-full border-4 border-black bg-white dark:border-gray-400">
      {state.board.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <CellTile
            column={colIdx}
            focusedCell={state.focusedCell}
            handleFocus={setFocusedCell}
            key={`${(rowIdx + 1) * colIdx}-${cell.value}`}
            row={rowIdx}
          />
        )),
      )}
    </div>
  );
}
