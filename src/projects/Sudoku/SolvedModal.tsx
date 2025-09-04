import { useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useSudokuContext } from './SudokuContext';

export function SolvedModal() {
  const {
    state: { isSolved },
  } = useSudokuContext();

  const [hasSeen, setHasSeen] = useState(false);

  function handleOpenChange(open: boolean) {
    if (!open) {
      setHasSeen(true);
    }
  }

  return (
    <Dialog modal={true} onOpenChange={handleOpenChange} open={isSolved && !hasSeen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Puzzle Solved</DialogTitle>
        </DialogHeader>
        <div>
          <p>Wow, great job! I knew you could do it.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
