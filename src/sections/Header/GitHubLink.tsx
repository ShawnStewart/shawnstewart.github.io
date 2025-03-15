import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { reactPwaRepository, repository } from '@/config';
import { cn } from '@/lib/utils';

export function GitHubLink() {
  const { pathname } = useLocation();
  const githubUrl = pathname === '/react-pwa' ? reactPwaRepository : repository;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          aria-label="GitHub repository"
          className={cn(
            buttonVariants({
              className: 'rounded-full [&_svg]:size-6',
              size: 'icon',
              variant: 'ghost',
            }),
          )}
          target="_blank"
          to={githubUrl}
        >
          <GitHubLogoIcon />
        </Link>
      </TooltipTrigger>
      <TooltipContent>{"It's open source"}</TooltipContent>
    </Tooltip>
  );
}
