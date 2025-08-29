import { cn } from '@/lib/utils';

import { Candidates } from './Candidates';
import { useCell } from './hooks/useCell';
import { Number } from './Number';
import { useSudokuContext } from './SudokuContext';
import type { SudokuCell } from './types';

interface Props {
  column: number;
  focusedCell: SudokuCell | null;
  handleFocus: (cell: SudokuCell | null) => void;
  row: number;
}

export function CellTile({ column, row, focusedCell, handleFocus }: Props) {
  const {
    state: { settings },
  } = useSudokuContext();
  const { cell, hasConflict } = useCell({ column, row });
  const { autoCandidates, blockId, readOnly, value, userCandidates } = cell;

  const candidates = !value && settings.showAutoCandidates ? autoCandidates : userCandidates;
  const showCandidates = !!candidates;

  const isRelatedToFocusedCell =
    blockId === focusedCell?.blockId || column === focusedCell?.column || row === focusedCell?.row;
  const isFocusedCell = column === focusedCell?.column && row === focusedCell.row;
  const matchesFocusedCellValue = value && value === focusedCell?.value;

  const className = cn(
    'aspect-square',
    'border-[.5px]  border-gray-400',
    {
      flex: !showCandidates,
      'grid grid-cols-3 grid-rows-3': showCandidates,
    },

    { 'bg-yellow-100': isRelatedToFocusedCell },
    { 'bg-gray-200': readOnly },
    { 'bg-orange-400': isFocusedCell || matchesFocusedCellValue },
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
      {showCandidates && <Candidates candidateMask={candidates} />}
      {value && (
        <div className="relative w-full">
          <Number>{value}</Number>
          {settings.showConflictHighlighting && hasConflict && (
            <div className="absolute right-[15%] bottom-[15%] h-[15%] w-[15%] rounded-full bg-red-600" />
          )}
        </div>
      )}
    </div>
  );
}
