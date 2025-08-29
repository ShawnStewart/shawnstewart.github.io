import { useEffect } from 'react';

import { useSudokuContext } from '../SudokuContext';

export function useKeyboardControls() {
  const { state, setCellValue, setFocusedCell } = useSudokuContext();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const { column = 0, row = 0 } = state.focusedCell ?? {};

      // Number entry
      if (e.key >= '1' && e.key <= '9') {
        setCellValue(Number(e.key));
      }
      // Clear cell
      else if (e.key === 'Backspace' || e.key === 'Delete') {
        setCellValue(null);
      }
      // Navigation
      else if (e.key === 'ArrowUp') {
        const nextRow = Math.max(0, row - 1);
        setFocusedCell(state.board[nextRow][column]);
      } else if (e.key === 'ArrowDown') {
        const nextRow = Math.min(8, row + 1);
        setFocusedCell(state.board[nextRow][column]);
      } else if (e.key === 'ArrowLeft') {
        const nextCol = Math.max(0, column - 1);
        setFocusedCell(state.board[row][nextCol]);
      } else if (e.key === 'ArrowRight') {
        const nextCol = Math.min(8, column + 1);
        setFocusedCell(state.board[row][nextCol]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setCellValue, setFocusedCell, state.board, state.focusedCell]);
}
