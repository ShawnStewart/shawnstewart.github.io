import { CellTile } from './CellTile';

export function GameBoard() {
  return (
    <div className="grid aspect-square w-full grid-cols-9 grid-rows-9 border-4 border-black bg-white dark:border-gray-400">
      {new Array(81).fill(null).map((_, index) => (
        <CellTile key={index} showCandidates={index % 2 === 0} />
      ))}
    </div>
  );
}
