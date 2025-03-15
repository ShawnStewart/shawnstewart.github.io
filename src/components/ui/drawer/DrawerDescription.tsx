import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils';

export const DrawerDescription = forwardRef<
  ElementRef<typeof DrawerPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    className={cn('text-sm text-muted-foreground', className)}
    ref={ref}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;
