import { getTestPuzzle } from './helpers/getPuzzle';
import type { SudokuCell, SudokuState } from './types';

type SudokuAction =
  | { type: 'SET_CELL'; value: number | null }
  | { type: 'SET_FOCUSED_CELL'; cell: SudokuCell | null };

export function sudokuReducer(state: SudokuState, action: SudokuAction): SudokuState {
  switch (action.type) {
    case 'SET_CELL': {
      if (!state.focusedCell) return state;
      const { column, row } = state.focusedCell;
      const updatedBoard = state.board.map((r, rIdx) => {
        return rIdx === row
          ? r.map((cell, cIdx) => {
              return cIdx === column
                ? {
                    ...cell,
                    value: action.value,
                  }
                : cell;
            })
          : r;
      });
      return { ...state, board: updatedBoard };
    }
    case 'SET_FOCUSED_CELL': {
      return { ...state, focusedCell: action.cell };
    }
    default:
      return state;
  }
}

function getInitialCounts(): number[][] {
  return new Array<number[]>(9).fill([]).map(() => new Array<number>(9).fill(0));
}

export const initialSudokuState: SudokuState = {
  board: getTestPuzzle(),
  countsByBlock: getInitialCounts(),
  countsByCol: getInitialCounts(),
  countsByRow: getInitialCounts(),
  focusedCell: null,
};
