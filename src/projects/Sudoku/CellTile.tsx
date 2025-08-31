import { cn } from '@/lib/utils';

import { Candidates } from './Candidates';
import { useCell } from './hooks/useCell';
import { Number } from './Number';
import { useSudokuContext } from './SudokuContext';

interface Props {
  column: number;
  row: number;
}

export function CellTile({ column, row }: Props) {
  const {
    state: { focusedCell, settings },
    setFocusedCell,
  } = useSudokuContext();
  const { cell, hasConflict } = useCell({ column, row });
  const { autoCandidates, blockId, readOnly, value, userCandidates } = cell;

  const showCandidates = !value;
  const candidates = settings.showAutoCandidates ? autoCandidates : userCandidates;

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
    { 'bg-cyan-200': isRelatedToFocusedCell },
    { 'bg-gray-200': readOnly },
    { 'bg-cyan-500': isFocusedCell || matchesFocusedCellValue },
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
    setFocusedCell(cell);
  }

  return (
    <div className={className} onClick={handleClick}>
      {showCandidates && <Candidates candidateMask={candidates} isFocusedCell={isFocusedCell} />}
      {value && (
        <div className="relative w-full">
          <Number>{value}</Number>
          {settings.showConflictHighlighting && hasConflict && (
            <div className="absolute right-[15%] bottom-[15%] h-[15%] w-[15%] rounded-full bg-red-500" />
          )}
        </div>
      )}
    </div>
  );
}
