import type { CandidateMask } from './helpers/candidates';

export interface SudokuCell {
  autoCandidates: CandidateMask;
  blockId: number;
  column: number;
  row: number;
  readOnly: boolean;
  userCandidates: CandidateMask;
  value: number | null;
}

export type SudokuBoard = SudokuCell[][];

export interface SudokuSettings {
  showAutoCandidates: boolean;
  showConflictHighlighting: boolean;
}

export interface SudokuState {
  board: SudokuBoard;
  countsByBlock: number[][];
  countsByCol: number[][];
  countsByRow: number[][];
  focusedCell: SudokuCell | null;
  settings: SudokuSettings;
}
