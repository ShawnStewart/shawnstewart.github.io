import type { ComponentProps } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

export const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = 'Drawer';
