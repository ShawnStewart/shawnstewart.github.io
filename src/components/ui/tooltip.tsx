import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

interface ArrowProps extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow> {
  show?: boolean;
}

interface TooltipContentProps extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  arrowProps?: ArrowProps;
}

export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      arrowProps: { show: showArrow = true, ...arrowProps } = {},
      children,
      className,
      sideOffset = 8,
      ...props
    },
    ref,
  ) => {
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className={cn(
            'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className,
          )}
          ref={ref}
          sideOffset={sideOffset}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            {...arrowProps}
            className={cn('scale-0 fill-primary', showArrow && 'scale-100', arrowProps.className)}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    );
  },
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
