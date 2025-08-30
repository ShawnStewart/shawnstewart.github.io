import { Controls } from './Controls';
import { GameBoard } from './GameBoard';
import { SudokuProvider } from './SudokuContext';

export function Sudoku() {
  return (
    <SudokuProvider>
      <div className="flex flex-col items-center gap-x-10 gap-y-2 lg:w-full lg:flex-row lg:justify-center">
        <GameBoard />
        <Controls />
      </div>
    </SudokuProvider>
  );
}
