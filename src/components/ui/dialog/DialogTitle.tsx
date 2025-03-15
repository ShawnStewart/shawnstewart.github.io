import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    ref={ref}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
