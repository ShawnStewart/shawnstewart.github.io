import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { DialogActions } from '@/hooks/useDialogActions';
import { useDialogActions } from '@/hooks/useDialogActions';

const headerHotkeysContext = createContext<DialogActions | null>(null);

export function HeaderHotkeysContext({ children }: PropsWithChildren) {
  const { close, isOpen, open, toggle } = useDialogActions();

  const memoizedActions = useMemo(
    () => ({ close, isOpen, open, toggle }),
    [close, isOpen, open, toggle],
  );

  return (
    <headerHotkeysContext.Provider value={memoizedActions}>
      {children}
    </headerHotkeysContext.Provider>
  );
}

export function useHeaderHotkeys() {
  const context = useContext(headerHotkeysContext);

  if (!context) throw new Error('useHeaderHotkeys must be used within a HeaderHotkeysContext');

  return context;
}
