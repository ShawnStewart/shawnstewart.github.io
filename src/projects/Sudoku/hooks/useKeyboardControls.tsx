import { useEffect } from 'react';

import { useSudokuContext } from '../SudokuContext';
import { useSetCellValue } from './useSetCellValue';

export function useKeyboardControls() {
  const { board, focusedCell, setFocusedCell } = useSudokuContext();

  const setCellValue = useSetCellValue();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const col = focusedCell?.column ?? 0;
      const row = focusedCell?.row ?? 0;

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
        setFocusedCell(board[nextRow][col]);
      } else if (e.key === 'ArrowDown') {
        const nextRow = Math.min(8, row + 1);
        setFocusedCell(board[nextRow][col]);
      } else if (e.key === 'ArrowLeft') {
        const nextCol = Math.max(0, col - 1);
        setFocusedCell(board[row][nextCol]);
      } else if (e.key === 'ArrowRight') {
        const nextCol = Math.min(8, col + 1);
        setFocusedCell(board[row][nextCol]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board, focusedCell?.column, focusedCell?.row, setCellValue, setFocusedCell]);
}
