import { getTestPuzzle } from './helpers/getPuzzle';
import type { SudokuBoard, SudokuCell, SudokuState } from './types';

type SudokuAction =
  | { type: 'SET_CELL'; value: number | null }
  | { type: 'SET_FOCUSED_CELL'; cell: SudokuCell | null };

export function sudokuReducer(state: SudokuState, action: SudokuAction): SudokuState {
  switch (action.type) {
    case 'SET_CELL': {
      if (!state.focusedCell || state.focusedCell.value === action.value) return state;
      const { blockId, column, row, value: prevValue } = state.focusedCell;
      const { value: nextValue } = action;

      const updatedBoard = state.board.map((r, rIdx) => {
        return rIdx === row
          ? r.map((cell, cIdx) => {
              return cIdx === column
                ? {
                    ...cell,
                    value: nextValue,
                  }
                : cell;
            })
          : r;
      });

      const updatedCountsByBlock = state.countsByBlock.map((block) => [...block]);
      const updatedCountsByCol = state.countsByCol.map((col) => [...col]);
      const updatedCountsByRow = state.countsByRow.map((row) => [...row]);

      // decrement old value if present
      if (prevValue) {
        const idx = prevValue - 1;
        updatedCountsByBlock[blockId][idx] -= 1;
        updatedCountsByCol[column][idx] -= 1;
        updatedCountsByRow[row][idx] -= 1;
      }

      // increment new value if not null
      if (nextValue) {
        const idx = nextValue - 1;
        updatedCountsByBlock[blockId][idx] += 1;
        updatedCountsByCol[column][idx] += 1;
        updatedCountsByRow[row][idx] += 1;
      }

      return {
        ...state,
        board: updatedBoard,
        countsByBlock: updatedCountsByBlock,
        countsByCol: updatedCountsByCol,
        countsByRow: updatedCountsByRow,
        focusedCell: {
          ...state.focusedCell,
          value: nextValue,
        },
      };
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

function getInitialCountsFromBoard(board: SudokuBoard): {
  countsByBlock: SudokuState['countsByBlock'];
  countsByCol: SudokuState['countsByCol'];
  countsByRow: SudokuState['countsByRow'];
} {
  const countsByBlock = getInitialCounts();
  const countsByCol = getInitialCounts();
  const countsByRow = getInitialCounts();

  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.value) {
        const valueIdx = cell.value - 1;
        countsByBlock[cell.blockId][valueIdx] += 1;
        countsByCol[cell.column][valueIdx] += 1;
        countsByRow[cell.row][valueIdx] += 1;
      }
    });
  });

  return {
    countsByBlock,
    countsByCol,
    countsByRow,
  };
}

export function getInitialSudokuState(): SudokuState {
  const board = getTestPuzzle();
  const { countsByBlock, countsByCol, countsByRow } = getInitialCountsFromBoard(board);
  return {
    board,
    countsByBlock,
    countsByCol,
    countsByRow,
    focusedCell: null,
  };
}
