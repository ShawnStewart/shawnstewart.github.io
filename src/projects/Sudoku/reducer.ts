import { toggleCandidate } from './helpers/candidates';
import { getTestPuzzle } from './helpers/getPuzzle';
import { checkIsSolvedAgainstSolution, setAutoCandidates } from './helpers/solver';
import { solution } from './puzzle';
import type { SudokuBoard, SudokuCell, SudokuState } from './types';

type SudokuAction =
  | { type: 'CHECK_CELL' }
  | { type: 'CHECK_PUZZLE' }
  | { type: 'SET_CELL'; value: number | null }
  | { type: 'SET_FOCUSED_CELL'; cell: SudokuCell | null }
  | { type: 'SET_INPUT_MODE'; inputMode: SudokuState['inputMode'] }
  | { type: 'TOGGLE_CANDIDATE'; value: number | null }
  | { type: 'TOGGLE_INPUT_MODE' }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<SudokuState['settings']> };

export function sudokuReducer(state: SudokuState, action: SudokuAction): SudokuState {
  switch (action.type) {
    case 'CHECK_CELL': {
      if (!state.focusedCell || state.isSolved) return state;
      const { column, row } = state.focusedCell;
      const { isValidated, value } = state.board[row][column];
      if (isValidated || !value) return state;

      const isCorrect = value === solution[row][column];

      const updatedCell: SudokuCell = {
        ...state.board[row][column],
        isInvalid: !isCorrect,
        isValidated: isCorrect,
      };

      const updatedBoard = state.board.map((r, rIdx) =>
        r.map((cell, cIdx) => (rIdx === row && cIdx === column ? updatedCell : { ...cell })),
      );

      return { ...state, board: updatedBoard };
    }
    case 'CHECK_PUZZLE': {
      const updatedBoard = state.board.map((r, rIdx) =>
        r.map((cell, cIdx) => {
          const isCorrect = cell.value === solution[rIdx][cIdx];
          return { ...cell, isInvalid: !isCorrect, isValidated: isCorrect };
        }),
      );

      return { ...state, board: updatedBoard };
    }
    case 'SET_CELL': {
      if (
        !state.focusedCell ||
        state.focusedCell.readOnly ||
        state.focusedCell.value === action.value
      )
        return state;
      const { blockId, column, row } = state.focusedCell;
      const { value: prevValue } = state.board[row][column];
      const { value: nextValue } = action;

      const updatedCell: SudokuCell = {
        ...state.board[row][column],
        value: nextValue,
      };

      let updatedBoard = state.board.map((r, rIdx) =>
        r.map((cell, cIdx) => (rIdx === row && cIdx === column ? updatedCell : { ...cell })),
      );

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

      updatedBoard = setAutoCandidates({
        board: updatedBoard,
        countsByBlock: updatedCountsByBlock,
        countsByCol: updatedCountsByCol,
        countsByRow: updatedCountsByRow,
      });

      return {
        ...state,
        board: updatedBoard,
        countsByBlock: updatedCountsByBlock,
        countsByCol: updatedCountsByCol,
        countsByRow: updatedCountsByRow,
        focusedCell: updatedBoard[row][column],
        isSolved: checkIsSolvedAgainstSolution({ board: updatedBoard, solution }),
      };
    }
    case 'SET_FOCUSED_CELL': {
      return { ...state, focusedCell: action.cell };
    }
    case 'SET_INPUT_MODE': {
      return { ...state, inputMode: action.inputMode };
    }
    case 'TOGGLE_CANDIDATE': {
      if (!state.focusedCell) return state;
      const { blockId, column, row } = state.focusedCell;
      const cell = state.board[row][column];
      const { value: prevValue } = cell;
      const { value: nextValue } = action;

      const updatedCell: SudokuCell = { ...cell };

      if (prevValue && !nextValue) {
        updatedCell.value = null;
      } else {
        updatedCell.value = null;
        updatedCell.userCandidates = !nextValue
          ? 0
          : toggleCandidate(cell.userCandidates, nextValue);
      }

      let updatedBoard = state.board.map((r, rIdx) =>
        r.map((cell, cIdx) => (rIdx === row && cIdx === column ? updatedCell : { ...cell })),
      );

      let updatedCountsByBlock = state.countsByBlock;
      let updatedCountsByCol = state.countsByCol;
      let updatedCountsByRow = state.countsByRow;
      if (prevValue) {
        updatedCountsByBlock = state.countsByBlock.map((block) => [...block]);
        updatedCountsByCol = state.countsByCol.map((col) => [...col]);
        updatedCountsByRow = state.countsByRow.map((row) => [...row]);

        const idx = prevValue - 1;
        updatedCountsByBlock[blockId][idx] -= 1;
        updatedCountsByCol[column][idx] -= 1;
        updatedCountsByRow[row][idx] -= 1;

        updatedBoard = setAutoCandidates({
          board: updatedBoard,
          countsByBlock: updatedCountsByBlock,
          countsByCol: updatedCountsByCol,
          countsByRow: updatedCountsByRow,
        });
      }

      return {
        ...state,
        board: updatedBoard,
        countsByBlock: updatedCountsByBlock,
        countsByCol: updatedCountsByCol,
        countsByRow: updatedCountsByRow,
        focusedCell: updatedBoard[row][column],
      };
    }
    case 'TOGGLE_INPUT_MODE': {
      const nextMode = state.inputMode === 'normal' ? 'candidate' : 'normal';
      return { ...state, inputMode: nextMode };
    }
    case 'UPDATE_SETTINGS': {
      const nextState = { ...state, settings: { ...state.settings, ...action.settings } };
      if (action.settings.showAutoCandidates) {
        nextState.inputMode = 'normal';
      }
      return nextState;
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
  let board = getTestPuzzle();
  const { countsByBlock, countsByCol, countsByRow } = getInitialCountsFromBoard(board);
  board = setAutoCandidates({ board, countsByBlock, countsByCol, countsByRow });
  return {
    board,
    countsByBlock,
    countsByCol,
    countsByRow,
    focusedCell: null,
    inputMode: 'normal',
    isSolved: false,
    settings: {
      showAutoCandidates: false,
      showConflictHighlighting: false,
    },
  };
}
