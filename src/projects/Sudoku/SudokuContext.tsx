import type { ReactNode } from 'react';
import { createContext, useContext, useReducer } from 'react';

import { getInitialSudokuState, sudokuReducer } from './reducer';
import type { SudokuCell, SudokuState } from './types';

interface SudokuContextType {
  setCellValue: (value: number | null) => void;
  setFocusedCell: (cell: SudokuCell | null) => void;
  state: SudokuState;
}

const SudokuContext = createContext<SudokuContextType | undefined>(undefined);

export const SudokuProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(sudokuReducer, null, getInitialSudokuState);

  const setCellValue = (value: number | null) => {
    dispatch({ type: 'SET_CELL', value });
  };

  const setFocusedCell = (cell: SudokuCell | null) => {
    dispatch({ cell, type: 'SET_FOCUSED_CELL' });
  };

  const value = { setCellValue, setFocusedCell, state };

  return <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>;
};

export const useSudokuContext = () => {
  const context = useContext(SudokuContext);
  if (!context) {
    throw new Error('useSudoku must be used within a SudokuProvider');
  }
  return context;
};
