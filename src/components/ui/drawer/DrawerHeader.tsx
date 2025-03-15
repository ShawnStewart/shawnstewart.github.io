import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export const DrawerHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';
