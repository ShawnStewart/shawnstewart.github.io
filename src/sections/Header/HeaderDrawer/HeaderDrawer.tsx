import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { useHeaderDrawer } from './HeaderDrawerContext';
import { NavigationMenu } from './NavigationMenu';

export function HeaderDrawer() {
  const { close, isOpen, toggle } = useHeaderDrawer();

  return (
    <Drawer autoFocus direction="left" onOpenChange={toggle} open={isOpen}>
      <DrawerTrigger asChild>
        <Button aria-label="Navigation menu" className="rounded-full" size="icon" variant="ghost">
          <HamburgerMenuIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay className="bg-transparent" />
        <DrawerContent
          aria-describedby={undefined}
          className="text-foreground"
          direction="left"
          onEscapeKeyDown={close}
          onPointerDownOutside={close}
        >
          <VisuallyHidden asChild>
            <DrawerTitle>Navigation menu</DrawerTitle>
          </VisuallyHidden>

          <NavigationMenu onNavigationSelect={close} />
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
