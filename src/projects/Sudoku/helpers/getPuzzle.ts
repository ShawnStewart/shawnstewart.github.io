import { puzzle } from '../puzzle';
import type { SudokuBoard, SudokuCell } from '../types';
import { ALL_CANDIDATES } from './candidates';
import { eliminateCandidates } from './solver';

function getBlockId({ row, column }: { column: number; row: number }) {
  return Math.floor(row / 3) * 3 + Math.floor(column / 3);
}

export function getTestPuzzle(): SudokuBoard {
  let board = puzzle.map((r, row) =>
    r.map(
      (value, column): SudokuCell => ({
        blockId: getBlockId({ column, row }),
        column,
        readOnly: !!value,
        row,
        solutionCandidates: ALL_CANDIDATES,
        userCandidates: 0,
        value: value || null,
      }),
    ),
  );

  board = eliminateCandidates(board);

  return board;
}

export function getBlankBoard(): SudokuBoard {
  return Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, column): SudokuCell => {
      return {
        blockId: getBlockId({ column, row }),
        column,
        readOnly: false,
        row,
        solutionCandidates: 0,
        userCandidates: 0,
        value: null,
      };
    }),
  );
}
