import type { SudokuBoard } from '../SudokuContext';
import type { CandidateMask } from './candidates';

export function eliminateCandidates(board: SudokuBoard) {
  return board.map((row, r) =>
    row.map((cell, c) => {
      if (cell.value !== null) {
        cell.solutionCandidates = 0;
        return cell;
      }

      let usedMask: CandidateMask = 0;

      // Row
      for (let col = 0; col < 9; col++) {
        const val = board[r][col].value;
        if (val) usedMask |= 1 << (val - 1);
      }

      // Column
      for (let row = 0; row < 9; row++) {
        const val = board[row][c].value;
        if (val) usedMask |= 1 << (val - 1);
      }

      // Block
      const br = Math.floor(r / 3) * 3;
      const bc = Math.floor(c / 3) * 3;
      for (let rr = br; rr < br + 3; rr++) {
        for (let cc = bc; cc < bc + 3; cc++) {
          const val = board[rr][cc].value;
          if (val) usedMask |= 1 << (val - 1);
        }
      }

      return {
        ...cell,
        solutionCandidates: cell.solutionCandidates & ~usedMask,
      };
    }),
  );
}
