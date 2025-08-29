import { useSudokuContext } from '../SudokuContext';

export function useCell({ column, row }: { column: number; row: number }) {
  const {
    state: { board, countsByBlock, countsByCol, countsByRow },
  } = useSudokuContext();

  const cell = board[row][column];
  const idx = cell.value ? cell.value - 1 : -1;
  const hasConflict =
    countsByBlock[cell.blockId][idx] > 1 ||
    countsByCol[column][idx] > 1 ||
    countsByRow[row][idx] > 1;

  return {
    cell,
    hasConflict,
  };
}
