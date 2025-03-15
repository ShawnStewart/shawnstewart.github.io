import { BlendingModeIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/theme';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label="Theme toggle"
          className="rounded-full [&_svg]:size-6"
          onClick={toggleTheme}
          size="icon"
          variant="ghost"
        >
          <BlendingModeIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Switch theme</TooltipContent>
    </Tooltip>
  );
}
