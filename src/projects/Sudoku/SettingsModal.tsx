import type { PropsWithChildren } from 'react';
import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog modal={true} onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <ControlButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Settings
        </ControlButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sudoku Settings</DialogTitle>
        </DialogHeader>
        <SettingsModalContent />
      </DialogContent>
    </Dialog>
  );
}

function SettingsModalContent() {
  return (
    <div className="flex w-fit flex-col gap-2">
      <SettingToggle settingKey="showAutoCandidates">Show auto candidates</SettingToggle>
      <SettingToggle settingKey="showConflictHighlighting">
        Show conflict highlighting
      </SettingToggle>
    </div>
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
    <div className="flex items-center justify-between gap-x-8">
      <label htmlFor={settingKey}>{children}</label>
      <Switch
        checked={settings[settingKey]}
        id={settingKey}
        onCheckedChange={handleSettingChange}
      />
    </div>
  );
}
