import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

import { getInitialSudokuState, sudokuReducer } from './reducer';
import type { SudokuCell, SudokuSettings, SudokuState } from './types';

interface SudokuContextType {
  checkCell: () => void;
  checkPuzzle: () => void;
  setCellValue: (value: number | null) => void;
  setFocusedCell: (cell: SudokuCell | null) => void;
  setInputMode: (mode: SudokuState['inputMode']) => void;
  state: SudokuState;
  toggleCandidate: (value: number | null) => void;
  toggleInputMode: () => void;
  updateSettings: (settings: Partial<SudokuSettings>) => void;
}

const SudokuContext = createContext<SudokuContextType | undefined>(undefined);

export const SudokuProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(sudokuReducer, null, getInitialSudokuState);

  function checkCell() {
    dispatch({ type: 'CHECK_CELL' });
  }

  function checkPuzzle() {
    dispatch({ type: 'CHECK_PUZZLE' });
  }

  const setCellValue = (value: number | null) => {
    dispatch({ type: 'SET_CELL', value });
  };

  const setFocusedCell = useCallback(
    (cell: SudokuCell | null) => {
      if (cell?.column === state.focusedCell?.column && cell?.row === state.focusedCell?.row)
        return;
      dispatch({ cell, type: 'SET_FOCUSED_CELL' });
    },
    [state.focusedCell?.column, state.focusedCell?.row],
  );

  function setInputMode(inputMode: SudokuState['inputMode']) {
    dispatch({ inputMode, type: 'SET_INPUT_MODE' });
  }

  const toggleCandidate = (value: number | null) => {
    dispatch({ type: 'TOGGLE_CANDIDATE', value });
  };

  const toggleInputMode = () => {
    dispatch({ type: 'TOGGLE_INPUT_MODE' });
  };

  const updateSettings = (settings: Partial<SudokuSettings>) => {
    dispatch({ settings, type: 'UPDATE_SETTINGS' });
  };

  const value = useMemo<SudokuContextType>(
    () => ({
      checkCell,
      checkPuzzle,
      setCellValue,
      setFocusedCell,
      setInputMode,
      state,
      toggleCandidate,
      toggleInputMode,
      updateSettings,
    }),
    [setFocusedCell, state],
  );

  return <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>;
};

export const useSudokuContext = () => {
  const context = useContext(SudokuContext);
  if (!context) {
    throw new Error('useSudoku must be used within a SudokuProvider');
  }
  return context;
};
