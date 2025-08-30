import { X } from 'lucide-react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

import { Button } from '@/components/ui/button';

import { SettingsModal } from './SettingsModal';
import { useSudokuContext } from './SudokuContext';

export function Controls() {
  const { setCellValue } = useSudokuContext();

  return (
    <div className="grid grid-cols-5 gap-2 lg:grid-cols-3">
      <SettingsModal />

      <div className="col-span-3 lg:hidden"></div>

      <ControlButton disabled>Undo</ControlButton>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <ControlButton
          key={num}
          onClick={() => {
            setCellValue(num);
          }}
        >
          {num}
        </ControlButton>
      ))}

      <ControlButton
        className="lg:col-start-3 lg:row-start-1"
        onClick={() => {
          setCellValue(null);
        }}
      >
        <X />
      </ControlButton>
    </div>
  );
}

export const ControlButton = forwardRef<
  ElementRef<typeof Button>,
  ComponentPropsWithoutRef<typeof Button>
>(({ children, ...props }, ref) => (
  <Button variant="outline" {...props} ref={ref}>
    {children}
  </Button>
));

ControlButton.displayName = 'ControlButton';
