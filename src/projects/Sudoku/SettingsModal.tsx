import { Lightbulb } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

import { ControlButton } from './Controls';
import { useSudokuContext } from './SudokuContext';
import type { SudokuSettings } from './types';

export function SettingsModal() {
  const {
    state: { isSolved },
  } = useSudokuContext();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog modal={true} onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <ControlButton
          disabled={isSolved}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Lightbulb aria-label="Help" className="md:hidden" />
          <span className="hidden md:inline">Help</span>
        </ControlButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sudoku Helpers</DialogTitle>
        </DialogHeader>
        <SettingsModalContent />
      </DialogContent>
    </Dialog>
  );
}

function SettingsModalContent() {
  const {
    checkCell,
    checkPuzzle,
    state: { focusedCell },
  } = useSudokuContext();

  const hasFocusedCellValue = !focusedCell?.readOnly && !!focusedCell?.value;

  return (
    <>
      <div className="flex w-full flex-col gap-y-2">
        <SettingToggle settingKey="showAutoCandidates">Show auto candidates</SettingToggle>
        <SettingToggle settingKey="showConflictHighlighting">
          Show conflict highlighting
        </SettingToggle>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button disabled={!hasFocusedCellValue} onClick={checkCell} variant="outline">
          Check Cell
        </Button>
        <Button disabled={!hasFocusedCellValue} onClick={checkPuzzle} variant="outline">
          Check Puzzle
        </Button>
        <Button variant="outline">Reveal Cell</Button>
        <Button variant="outline">Reveal Solution</Button>
      </div>
    </>
  );
}

function SettingToggle({
  children,
  settingKey,
}: PropsWithChildren<{ settingKey: keyof SudokuSettings }>) {
  const {
    state: { settings },
    updateSettings,
  } = useSudokuContext();

  function handleSettingChange(value: boolean) {
    updateSettings({ [settingKey]: value });
  }

  return (
    <div className="flex items-center justify-between">
      <label className="grow" htmlFor={settingKey}>
        {children}
      </label>
      <Switch
        checked={settings[settingKey]}
        id={settingKey}
        onCheckedChange={handleSettingChange}
      />
    </div>
  );
}
