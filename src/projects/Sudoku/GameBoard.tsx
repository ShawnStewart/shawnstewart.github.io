import { CellTile } from './CellTile';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import type { SudokuCell } from './SudokuContext';
import { useSudokuContext } from './SudokuContext';

export function GameBoard() {
  useKeyboardControls();

  const { board, focusedCell, setFocusedCell } = useSudokuContext();

  function handleFocus(cell: SudokuCell | null) {
    setFocusedCell(cell);
  }

  return (
    <div className="grid aspect-square w-full grid-cols-9 grid-rows-9 border-4 border-black bg-white dark:border-gray-400">
      {board.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <CellTile
            cell={cell}
            focusedCell={focusedCell}
            handleFocus={handleFocus}
            key={`${(rowIdx + 1) * colIdx}-${cell.value}`}
          />
        )),
      )}
    </div>
  );
}
