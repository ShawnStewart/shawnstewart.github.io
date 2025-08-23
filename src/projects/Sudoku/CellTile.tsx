import { cn } from '@/lib/utils';

import { Candidates } from './Candidates';
import { Number } from './Number';

export function CellTile({ showCandidates = false }: { showCandidates?: boolean }) {
  return (
    <div
      className={cn(
        'aspect-square',
        'border-[.5px] border-gray-400',
        'grid grid-cols-3 grid-rows-3',
        {
          'bg-[wheat]': showCandidates,
        },
        'nth-[3n]:border-r-2',
        'nth-[3n+1]:border-l-2',
        'nth-[9n]:border-r-0',
        'nth-[9n+1]:border-l-0',
        'nth-[n+19]:nth-[-n+27]:border-b-2',
        'nth-[n+28]:nth-[-n+36]:border-t-2',
        'nth-[n+46]:nth-[-n+54]:border-b-2',
        'nth-[n+55]:nth-[-n+63]:border-t-2',
      )}
    >
      {showCandidates && <Candidates />}
      {/* {!showCandidates && <Number className="col-span-3 row-span-3">9</Number>} */}
      {!showCandidates && (
        <div className="col-span-3 row-span-3">
          <Number>9</Number>
        </div>
      )}
    </div>
  );
}
