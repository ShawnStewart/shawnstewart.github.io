import { CellTile } from './CellTile';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { useSudokuContext } from './SudokuContext';
import type { SudokuCell } from './types';

export function GameBoard() {
  useKeyboardControls();

  const { state, setFocusedCell } = useSudokuContext();

  function handleFocus(cell: SudokuCell | null) {
    setFocusedCell(cell);
  }

  return (
    <div className="grid-cols-sudoku grid-rows-sudoku grid aspect-square w-full border-4 border-black bg-white dark:border-gray-400">
      {state.board.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <CellTile
            cell={cell}
            focusedCell={state.focusedCell}
            handleFocus={handleFocus}
            key={`${(rowIdx + 1) * colIdx}-${cell.value}`}
          />
        )),
      )}
    </div>
  );
}
