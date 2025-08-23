import { PageContentWrapper } from '@/components/PageContentWrapper';
import { Heading } from '@/components/ui/typography';
import { Sudoku } from '@/projects/Sudoku';

export function SudokuPage() {
  return (
    <PageContentWrapper>
      <Heading>Sudoku Page</Heading>

      <Sudoku />
    </PageContentWrapper>
  );
}
