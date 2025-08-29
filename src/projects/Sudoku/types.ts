import type { CandidateMask } from './helpers/candidates';

export interface SudokuCell {
  blockId: number;
  column: number;
  row: number;
  solutionCandidates: CandidateMask;
  readOnly: boolean;
  userCandidates: CandidateMask;
  value: number | null;
}

export type SudokuBoard = SudokuCell[][];

export interface SudokuState {
  board: SudokuBoard;
  countsByBlock: number[][];
  countsByCol: number[][];
  countsByRow: number[][];
  focusedCell: SudokuCell | null;
}
