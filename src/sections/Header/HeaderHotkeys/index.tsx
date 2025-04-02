import { HeaderHotkeysContext } from './HeaderHotkeysContext';
import { HeaderHotkeysDialog } from './HeaderHotkeysDialog';

function detectKeyboard() {
  // Check if device is likely to have a physical keyboard
  const hasKeyboardAPI = 'keyboard' in navigator;
  const noTouchscreen = navigator.maxTouchPoints === 0;
  const isProbablyDesktop = !('ontouchstart' in window);

  return hasKeyboardAPI || noTouchscreen || isProbablyDesktop;
}

export function HeaderHotkeys() {
  const hasKeyboard = detectKeyboard();

  if (!hasKeyboard) return null;

  return (
    <HeaderHotkeysContext>
      <HeaderHotkeysDialog />
    </HeaderHotkeysContext>
  );
}
