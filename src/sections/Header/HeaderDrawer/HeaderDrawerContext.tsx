import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { DialogActions } from '@/hooks/useDialogActions';
import { useDialogActions } from '@/hooks/useDialogActions';

const headerDrawerContext = createContext<DialogActions | null>(null);

export function HeaderDrawerContext({ children }: PropsWithChildren) {
  const { close, isOpen, open, toggle } = useDialogActions();

  const memoizedActions = useMemo(
    () => ({ close, isOpen, open, toggle }),
    [close, isOpen, open, toggle],
  );

  return (
    <headerDrawerContext.Provider value={memoizedActions}>{children}</headerDrawerContext.Provider>
  );
}

export function useHeaderDrawer() {
  const context = useContext(headerDrawerContext);

  if (!context) throw new Error('useHeaderDrawer must be used within a HeaderDrawerContext');

  return context;
}
