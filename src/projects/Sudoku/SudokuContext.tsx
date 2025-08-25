import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import { puzzle } from './puzzle';

export interface SudokuCell {
  blockId: number;
  column: number;
  row: number;
  value: number | null;
  readOnly: boolean;
}

type SudokuBoard = SudokuCell[][]; // 9x9 grid

interface SudokuContextType {
  board: SudokuBoard;
  focusedCell: SudokuCell | null;
  setCellValue: (row: number, col: number, value: number | null) => void;
  setFocusedCell: (cell: SudokuCell | null) => void;
}

function getBlockId({ row, column }: { column: number; row: number }) {
  return Math.floor(row / 3) * 3 + Math.floor(column / 3);
}

function _getBlankBoard(): SudokuBoard {
  return Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, column): SudokuCell => {
      return {
        blockId: getBlockId({ column, row }),
        column,
        readOnly: false,
        row,
        value: null,
      };
    }),
  );
}

function getPuzzle(): SudokuBoard {
  return puzzle.map((r, row) =>
    r.map(
      (value, column): SudokuCell => ({
        blockId: getBlockId({ column, row }),
        column,
        readOnly: !!value,
        row,
        value: value || null,
      }),
    ),
  );
}

const SudokuContext = createContext<SudokuContextType | undefined>(undefined);

export const SudokuProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<SudokuBoard>(getPuzzle);
  const [focusedCell, _setFocusedCell] = useState<SudokuCell | null>(null);

  const setCellValue = (rowIdx: number, colIdx: number, value: number | null) => {
    setBoard((prev) =>
      prev.map((r, rIdx) => {
        return rIdx === rowIdx
          ? r.map((c, cIdx) => {
              return cIdx === colIdx ? { ...c, value } : c;
            })
          : r;
      }),
    );
  };

  const setFocusedCell = (cell: SudokuCell | null) => {
    _setFocusedCell(cell);
  };

  const value = { board, focusedCell, setCellValue, setFocusedCell };

  return <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>;
};

export const useSudokuContext = () => {
  const context = useContext(SudokuContext);
  if (!context) {
    throw new Error('useSudoku must be used within a SudokuProvider');
  }
  return context;
};
