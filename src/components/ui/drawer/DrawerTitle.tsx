import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils';

export const DrawerTitle = forwardRef<
  ElementRef<typeof DrawerPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    ref={ref}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
