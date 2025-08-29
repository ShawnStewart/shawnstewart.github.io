import { Controls } from './Controls';
import { GameBoard } from './GameBoard';
import { SudokuProvider } from './SudokuContext';

export function Sudoku() {
  return (
    <SudokuProvider>
      <div className="mx-auto flex max-w-[600px] flex-col gap-2">
        <GameBoard />
        <Controls />
      </div>
    </SudokuProvider>
  );
}
