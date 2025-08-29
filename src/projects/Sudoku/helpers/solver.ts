import type { SudokuBoard } from '../types';
import { ALL_CANDIDATES } from './candidates';

function countsToMask(counts: number[]): number {
  let mask = 0;
  for (let d = 0; d < 9; d++) {
    if (counts[d] > 0) {
      mask |= 1 << d;
    }
  }
  return mask;
}

export function eliminateCandidates({
  board,
  countsByBlock,
  countsByCol,
  countsByRow,
}: {
  board: SudokuBoard;
  countsByBlock: number[][];
  countsByCol: number[][];
  countsByRow: number[][];
}) {
  const blockMasks = countsByBlock.map((row) => countsToMask(row));
  const colMasks = countsByCol.map((row) => countsToMask(row));
  const rowMasks = countsByRow.map((row) => countsToMask(row));

  return board.map((row, r) =>
    row.map((cell, c) => {
      if (cell.value !== null) {
        cell.autoCandidates = 0;
        return cell;
      }

      const blockMask = blockMasks[cell.blockId];
      const colMask = colMasks[c];
      const rowMask = rowMasks[r];
      const allMasks = blockMask | colMask | rowMask;

      return {
        ...cell,
        autoCandidates: ALL_CANDIDATES & ~allMasks,
      };
    }),
  );
}
