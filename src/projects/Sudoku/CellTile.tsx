import { cn } from '@/lib/utils';

import { Candidates } from './Candidates';
import { Number } from './Number';
import { type SudokuCell } from './SudokuContext';

interface Props {
  cell: SudokuCell;
  focusedCell: SudokuCell | null;
  handleFocus: (cell: SudokuCell | null) => void;
}

export function CellTile({ cell, focusedCell, handleFocus }: Props) {
  const { blockId, column, readOnly, row, value } = cell;

  const showCandidates = !value;
  const isRelatedToFocusedCell =
    blockId === focusedCell?.blockId || column === focusedCell?.column || row === focusedCell?.row;
  const isFocusedCell = column === focusedCell?.column && row === focusedCell.row;
  const isFocusedCellValue = value && value === focusedCell?.value;

  const className = cn(
    'aspect-square',
    'border-[.5px] border-gray-400',
    'grid grid-cols-3 grid-rows-3',
    /* eslint-disable sort-keys-fix/sort-keys-fix */
    {
      'bg-yellow-100': isRelatedToFocusedCell,
      'bg-gray-200': readOnly,
      'bg-orange-400': isFocusedCell || isFocusedCellValue,
    },
    /* eslint-enable sort-keys-fix/sort-keys-fix */
    'nth-[3n]:border-r-2',
    'nth-[3n+1]:border-l-2',
    'nth-[9n]:border-r-0',
    'nth-[9n+1]:border-l-0',
    'nth-[n+19]:nth-[-n+27]:border-b-2',
    'nth-[n+28]:nth-[-n+36]:border-t-2',
    'nth-[n+46]:nth-[-n+54]:border-b-2',
    'nth-[n+55]:nth-[-n+63]:border-t-2',
  );

  function handleClick() {
    handleFocus(cell);
  }

  return (
    <div className={className} onClick={handleClick}>
      {showCandidates && <Candidates />}
      {value && (
        <div className="col-span-3 row-span-3">
          <Number>{value}</Number>
        </div>
      )}
    </div>
  );
}
