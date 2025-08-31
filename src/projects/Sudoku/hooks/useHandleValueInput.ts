import { useCallback } from 'react';

import { useSudokuContext } from '../SudokuContext';

export function useHandleValueInput() {
  const {
    setCellValue,
    state: { inputMode },
    toggleCandidate,
  } = useSudokuContext();
  return useCallback(
    (value: number | null) => {
      if (inputMode === 'normal') setCellValue(value);
      else toggleCandidate(value);
    },
    [inputMode, setCellValue, toggleCandidate],
  );
}
