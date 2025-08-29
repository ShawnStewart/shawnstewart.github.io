import { PageContentWrapper } from '@/components/PageContentWrapper';
import { Sudoku } from '@/projects/Sudoku';

export function SudokuPage() {
  return (
    <PageContentWrapper className="grid items-center">
      <Sudoku />
    </PageContentWrapper>
  );
}
