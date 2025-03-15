import { useCallback, useState } from 'react';

export interface DialogActions {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: (forceState?: boolean) => void;
}

export function useDialogActions(initialState = false): DialogActions {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = useCallback(
    (forceState?: boolean) => {
      setIsOpen((isOpen: boolean) => {
        return forceState ?? !isOpen;
      });
    },
    [setIsOpen],
  );

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return { close, isOpen, open, toggle };
}
