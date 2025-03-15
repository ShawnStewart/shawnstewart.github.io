import { HeaderHotkeysContext } from './HeaderHotkeysContext';
import { HeaderHotkeysDialog } from './HeaderHotkeysDialog';

export function HeaderHotkeys() {
  return (
    <HeaderHotkeysContext>
      <HeaderHotkeysDialog />
    </HeaderHotkeysContext>
  );
}
