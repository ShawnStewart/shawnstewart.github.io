import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export function PageContentWrapper({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-background text-foreground container grow py-4', className)} {...props}>
      {children}
    </div>
  );
}
