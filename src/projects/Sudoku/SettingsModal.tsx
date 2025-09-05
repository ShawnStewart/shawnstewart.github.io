import { Lightbulb } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useDialogActions } from '@/hooks/useDialogActions';

import { ControlButton } from './Controls';
import { useSudokuContext } from './SudokuContext';
import type { SudokuSettings } from './types';

export function SettingsModal() {
  const {
    state: { isSolved },
  } = useSudokuContext();

  const { close, isOpen, toggle } = useDialogActions();

  return (
    <Dialog modal={true} onOpenChange={toggle} open={isOpen}>
      <DialogTrigger asChild>
        <ControlButton
          disabled={isSolved}
          onClick={() => {
            toggle(true);
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
        <SettingsModalContent close={close} />
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  close: () => void;
}

function SettingsModalContent({ close }: Props) {
  const {
    checkCell,
    checkPuzzle,
    revealCell,
    revealPuzzle,
    state: { focusedCell },
  } = useSudokuContext();

  const hasFocusedCellValue = !focusedCell?.readOnly && !!focusedCell?.value;

  function handleAndClose(action: () => void) {
    action();
    close();
  }

  return (
    <>
      <div className="flex w-full flex-col gap-y-2">
        <SettingToggle settingKey="showAutoCandidates">Show auto candidates</SettingToggle>
        <SettingToggle settingKey="showConflictHighlighting">
          Show conflict highlighting
        </SettingToggle>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          disabled={!hasFocusedCellValue}
          onClick={() => {
            handleAndClose(checkCell);
          }}
          variant="outline"
        >
          Check Cell
        </Button>
        <Button
          disabled={!hasFocusedCellValue}
          onClick={() => {
            handleAndClose(checkPuzzle);
          }}
          variant="outline"
        >
          Check Puzzle
        </Button>
        <Button
          onClick={() => {
            handleAndClose(revealCell);
          }}
          variant="outline"
        >
          Reveal Cell
        </Button>
        <Button
          onClick={() => {
            handleAndClose(revealPuzzle);
          }}
          variant="outline"
        >
          Reveal Solution
        </Button>
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
