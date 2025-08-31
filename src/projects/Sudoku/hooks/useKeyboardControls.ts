import { useEffect } from 'react';

import { useSudokuContext } from '../SudokuContext';
import { useHandleValueInput } from './useHandleValueInput';

export function useKeyboardControls() {
  const { state, setFocusedCell, toggleInputMode } = useSudokuContext();
  const handleValueInput = useHandleValueInput();

  // Input handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const { column = 0, row = 0 } = state.focusedCell ?? {};

      const digit = e.code.startsWith('Digit') && parseInt(e.code.replace('Digit', ''), 10);

      // Number entry
      if (digit && digit >= 1 && digit <= 9) {
        handleValueInput(digit);
      }
      // Clear cell
      else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleValueInput(null);
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
  }, [handleValueInput, setFocusedCell, state.board, state.focusedCell]);

  // Input mode toggle handler
  useEffect(() => {
    function handleToggleInputMode(e: KeyboardEvent) {
      if (e.key === 'Shift' || e.key === 'Alt') {
        toggleInputMode();
      }
    }

    window.addEventListener('keydown', handleToggleInputMode);
    window.addEventListener('keyup', handleToggleInputMode);
    return () => {
      window.removeEventListener('keydown', handleToggleInputMode);
      window.removeEventListener('keyup', handleToggleInputMode);
    };
  }, [toggleInputMode]);
}
