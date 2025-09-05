import { cn } from '@/lib/utils';

import { type CandidateMask, candidateMaskToList } from './helpers/candidates';
import { Number } from './Number';
import { useSudokuContext } from './SudokuContext';

interface Props {
  candidateMask: CandidateMask;
  isFocusedCell: boolean;
}

export function Candidates({ candidateMask, isFocusedCell }: Props) {
  const {
    state: { settings },
    toggleCandidate,
  } = useSudokuContext();

  const candidates = candidateMaskToList(candidateMask);

  const canClickToToggle = !settings.showAutoCandidates && isFocusedCell;

  function handleClick(num: number) {
    return function clickToggleCandidate() {
      if (canClickToToggle) toggleCandidate(num);
    };
  }

  return candidates.map((candidate, i) => {
    const showNumber = !!candidate;
    const value = candidate ?? i + 1;
    return (
      <Number
        className={cn('fill-gray-600 opacity-0 transition-all duration-500 ease-in', {
          'fill-black opacity-100': showNumber,
          'hover:opacity-50': canClickToToggle && !showNumber,
        })}
        fontSize={65}
        key={value}
        onMouseDown={handleClick(value)}
      >
        {value}
      </Number>
    );
  });
}
