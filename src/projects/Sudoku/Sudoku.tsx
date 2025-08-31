import { Controls } from './Controls';
import { GameBoard } from './GameBoard';
import { SudokuProvider } from './SudokuContext';

export function Sudoku() {
  return (
    <SudokuProvider>
      <div className="mx-auto flex w-full flex-col items-center gap-x-10 gap-y-2 md:max-w-[70svh] lg:max-w-none lg:flex-row lg:justify-center">
        <GameBoard />
        <Controls />
      </div>
    </SudokuProvider>
  );
}
