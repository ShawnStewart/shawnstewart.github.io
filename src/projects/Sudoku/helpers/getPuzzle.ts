import { puzzle } from '../puzzle';
import type { SudokuBoard, SudokuCell } from '../types';
import { ALL_CANDIDATES } from './candidates';

function getBlockId({ row, column }: { column: number; row: number }) {
  return Math.floor(row / 3) * 3 + Math.floor(column / 3);
}

export function getTestPuzzle(): SudokuBoard {
  return puzzle.map((r, row) =>
    r.map(
      (value, column): SudokuCell => ({
        autoCandidates: 0,
        blockId: getBlockId({ column, row }),
        column,
        readOnly: !!value,
        row,
        userCandidates: 0,
        value: value || null,
      }),
    ),
  );
}

export function getBlankBoard(): SudokuBoard {
  return Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, column): SudokuCell => {
      return {
        autoCandidates: ALL_CANDIDATES,
        blockId: getBlockId({ column, row }),
        column,
        readOnly: false,
        row,
        userCandidates: 0,
        value: null,
      };
    }),
  );
}
