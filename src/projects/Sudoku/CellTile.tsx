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
    state: { focusedCell, isSolved, settings },
    setFocusedCell,
  } = useSudokuContext();
  const { cell, hasConflict } = useCell({ column, row });
  const { autoCandidates, blockId, isInvalid, isValidated, readOnly, value, userCandidates } = cell;

  const showCandidates = !value;
  const candidates = settings.showAutoCandidates ? autoCandidates : userCandidates;

  const isRelatedToFocusedCell =
    blockId === focusedCell?.blockId || column === focusedCell?.column || row === focusedCell?.row;
  const isFocusedCell = column === focusedCell?.column && row === focusedCell.row;
  const matchesFocusedCellValue = value && value === focusedCell?.value;

  const isSolvedOrValidated = !readOnly && (isSolved || isValidated);

  const className = cn(
    'aspect-square relative after:absolute after:inset-0 after:border-gray-400 after:pointer-events-none ',
    {
      flex: !showCandidates,
      'grid grid-cols-3 grid-rows-3': showCandidates,
    },
    { 'bg-white': true },
    { 'bg-cyan-200': isRelatedToFocusedCell },
    { 'bg-gray-200': readOnly },
    { 'bg-cyan-400': !isSolved && matchesFocusedCellValue },
    { 'bg-cyan-500': !isSolved && isFocusedCell },
    { 'bg-green-400': isSolvedOrValidated },
    { 'bg-green-600': isSolvedOrValidated && isFocusedCell },
    { 'fill-red-500 font-bold': isInvalid },
    'nth-[3n]:after:border-r-[1px]',
    'nth-[3n+1]:after:border-l-[1px]',
    'nth-[9n]:after:border-r-0',
    'nth-[9n+1]:after:border-l-0',
    'nth-[n+19]:nth-[-n+27]:after:border-b-[1px]',
    'nth-[n+28]:nth-[-n+36]:after:border-t-[1px]',
    'nth-[n+46]:nth-[-n+54]:after:border-b-[1px]',
    'nth-[n+55]:nth-[-n+63]:after:border-t-[1px]',
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
