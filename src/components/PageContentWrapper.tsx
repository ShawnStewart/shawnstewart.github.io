import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export function PageContentWrapper({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('container flex-grow bg-background py-4 text-foreground', className)}
      {...props}
    >
      {children}
    </div>
  );
}
