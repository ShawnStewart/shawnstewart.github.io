import { useHotkeys } from 'react-hotkeys-hook';

import { useTheme } from '@/components/ui/theme';

import { useHeaderDrawer } from '../HeaderDrawer/HeaderDrawerContext';
import { useHeaderHotkeys } from './HeaderHotkeysContext';

export function useHotkeysConfig() {
  const { toggleTheme } = useTheme();
  const { toggle: toggleHeaderDrawer, close: closeHeaderDrawer } = useHeaderDrawer();
  const { toggle: toggleHeaderHotkeys, close: closeHeaderHotkeys } = useHeaderHotkeys();

  const HOTKEYS_CONFIG = {
    HEADER_DRAWER: {
      action: () => {
        closeHeaderHotkeys();
        toggleHeaderDrawer();
      },
      description: 'Toggle navigation menu',
      key: 'alt+s',
    },
    HOTKEYS_MENU: {
      action: () => {
        closeHeaderDrawer();
        toggleHeaderHotkeys();
      },
      description: 'Toggle hotkeys menu',
      key: 'alt+k',
    },
    THEME: {
      action: toggleTheme,
      description: 'Toggle theme',
      key: 'alt+t',
    },
  } as const;

  useHotkeys(HOTKEYS_CONFIG.HEADER_DRAWER.key, () => {
    HOTKEYS_CONFIG.HEADER_DRAWER.action();
  });
  useHotkeys(HOTKEYS_CONFIG.THEME.key, HOTKEYS_CONFIG.THEME.action);
  useHotkeys(HOTKEYS_CONFIG.HOTKEYS_MENU.key, HOTKEYS_CONFIG.HOTKEYS_MENU.action);

  return HOTKEYS_CONFIG;
}
