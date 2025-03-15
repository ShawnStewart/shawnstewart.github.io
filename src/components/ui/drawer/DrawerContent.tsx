import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils';

const drawerContentVariants = cva('fixed flex flex-col border bg-background z-50', {
  defaultVariants: {
    direction: 'bottom',
    notch: true,
  },
  variants: {
    direction: {
      bottom: 'inset-x-0 bottom-0 mt-24 pt-10 h-auto rounded-t-lg',
      left: 'inset-y-0 left-0 mr-24 pr-10 w-auto rounded-r-lg',
    },
    notch: {
      false: 'p-0',
      true: '',
    },
  },
});

const drawerNotch = cva('rounded-full bg-muted', {
  defaultVariants: {
    direction: 'bottom',
  },
  variants: {
    direction: {
      bottom: 'mx-auto h-2 w-[100px] fixed top-4 inset-x-0',
      left: 'my-auto h-[100px] w-2 fixed right-4 inset-y-0',
    },
  },
});

interface DrawerContentProps
  extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof drawerContentVariants> {
  notchClassName?: string;
}

export const DrawerContent = forwardRef<
  ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, notch = true, notchClassName, direction, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Overlay />
    <DrawerPrimitive.Content
      className={cn(drawerContentVariants({ className, direction, notch }))}
      ref={ref}
      {...props}
    >
      {notch && <div className={cn(drawerNotch({ className: notchClassName, direction }))} />}
      {children}
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
));
DrawerContent.displayName = 'DrawerContent';
