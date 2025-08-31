import { Undo, X } from 'lucide-react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { useHandleValueInput } from './hooks/useHandleValueInput';
import { SettingsModal } from './SettingsModal';
import { useSudokuContext } from './SudokuContext';
import type { SudokuState } from './types';

export function Controls() {
  const handleValueInput = useHandleValueInput();

  return (
    <div className="grid w-full grid-cols-5 gap-2 lg:max-w-1/3 lg:grid-cols-3">
      <div className="col-span-3">
        <InputModeToggle />
      </div>

      <SettingsModal />

      <ControlButton disabled>
        <Undo aria-label="Undo" className="md:hidden" />
        <span className="hidden md:inline">Undo</span>
      </ControlButton>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <ControlButton
          key={num}
          onClick={() => {
            handleValueInput(num);
          }}
        >
          {num}
        </ControlButton>
      ))}

      <ControlButton
        className="lg:col-start-3 lg:row-start-2"
        onClick={() => {
          handleValueInput(null);
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

function InputModeToggle() {
  const {
    setInputMode,
    state: { inputMode, settings },
  } = useSudokuContext();

  function handleChange(value: SudokuState['inputMode']) {
    setInputMode(value);
  }

  return (
    <ToggleGroup
      className="w-full"
      onValueChange={handleChange}
      type="single"
      value={inputMode}
      variant="outline"
    >
      <ToggleGroupItem aria-label="Toggle normal input mode" value="normal">
        <span className="px-2">Normal</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        aria-label="Toggle candidate input mode"
        disabled={settings.showAutoCandidates}
        value="candidate"
      >
        <span className="px-2">Candidate</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
