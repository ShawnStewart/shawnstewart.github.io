import { Controls } from './Controls';
import { GameBoard } from './GameBoard';

export function Sudoku() {
  return (
    <div className="flex flex-col gap-2">
      <GameBoard />
      <Controls />
    </div>
  );
}
