import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

import { PageContentWrapper } from '../PageContentWrapper';

export function Loading({ className }: { className?: string }) {
  return (
    <PageContentWrapper className="flex items-center justify-center">
      <LoaderCircle className={cn('h-10 w-10 animate-spin', className)} />
    </PageContentWrapper>
  );
}
