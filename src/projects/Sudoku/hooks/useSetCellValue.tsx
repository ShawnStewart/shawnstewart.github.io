import { useSudokuContext } from '../SudokuContext';

export function useSetCellValue() {
  const { focusedCell, setCellValue } = useSudokuContext();

  return function handleSetValue(value: number | null) {
    if (!focusedCell || focusedCell.readOnly) return;
    setCellValue(focusedCell.row, focusedCell.column, value);
  };
}
