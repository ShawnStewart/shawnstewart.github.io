import { cn } from '@/lib/utils';

import { Candidates } from './Candidates';
import { Number } from './Number';
import type { SudokuCell } from './types';

interface Props {
  cell: SudokuCell;
  focusedCell: SudokuCell | null;
  handleFocus: (cell: SudokuCell | null) => void;
}

export function CellTile({ cell, focusedCell, handleFocus }: Props) {
  const { blockId, column, readOnly, row, value, solutionCandidates } = cell;

  const showCandidates = !value && !!solutionCandidates;
  const isRelatedToFocusedCell =
    blockId === focusedCell?.blockId || column === focusedCell?.column || row === focusedCell?.row;
  const isFocusedCell = column === focusedCell?.column && row === focusedCell.row;
  const isFocusedCellValue = value && value === focusedCell?.value;

  const className = cn(
    'aspect-square',
    'border-[.5px]  border-gray-400',
    {
      flex: !showCandidates,
      'grid grid-cols-3 grid-rows-3': showCandidates,
    },

    { 'bg-yellow-100': isRelatedToFocusedCell },
    { 'bg-gray-200': readOnly },
    { 'bg-orange-400': isFocusedCell || isFocusedCellValue },
    'nth-[3n]:border-r-2',
    'nth-[3n+1]:border-l-2',
    'nth-[9n]:border-r-[1px]',
    'nth-[9n+1]:border-l-[1px]',
    'nth-[n+19]:nth-[-n+27]:border-b-2',
    'nth-[n+28]:nth-[-n+36]:border-t-2',
    'nth-[n+46]:nth-[-n+54]:border-b-2',
    'nth-[n+55]:nth-[-n+63]:border-t-2',
    'select-none',
  );

  function handleClick() {
    handleFocus(cell);
  }

  return (
    <div className={className} onClick={handleClick}>
      {showCandidates && <Candidates candidateMask={solutionCandidates} />}
      {value && (
        <div className="w-full">
          <Number>{value}</Number>
        </div>
      )}
    </div>
  );
}
