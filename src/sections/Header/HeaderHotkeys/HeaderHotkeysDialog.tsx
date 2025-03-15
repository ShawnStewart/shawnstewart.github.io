import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useHeaderHotkeys } from './HeaderHotkeysContext';
import { useHotkeysConfig } from './useHotkeysConfig';

export function HeaderHotkeysDialog() {
  const hotkeysConfig = useHotkeysConfig();
  const { isOpen } = useHeaderHotkeys();

  return (
    <Dialog onOpenChange={hotkeysConfig.HOTKEYS_MENU.action} open={isOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              aria-label="Open hotkeys dialog"
              className="bg-transparent"
              size="sm"
              variant="outline"
            >
              {hotkeysConfig.HOTKEYS_MENU.key}
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Hot keys</TooltipContent>
      </Tooltip>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Hotkeys menu</DialogTitle>

          <ul className="flex flex-col gap-y-2">
            {Object.values(hotkeysConfig).map(({ action, description, key }) => (
              <li className="flex items-center justify-between" key={key}>
                <span>{description}</span>
                <Button
                  onClick={() => {
                    action();
                  }}
                  size="sm"
                  variant="outline"
                >
                  {key}
                </Button>
              </li>
            ))}
          </ul>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
