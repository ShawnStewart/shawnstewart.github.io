import { Link1Icon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { routes } from '@/routes';

interface NavigationMenuProps {
  onNavigationSelect: () => void;
}

export function NavigationMenu({ onNavigationSelect }: NavigationMenuProps) {
  return (
    <ul className="pt-14 pb-2">
      {Object.values(routes)
        .filter((route) => route.title)
        .map(({ path, title, icon: Icon }) => (
          <li key={path}>
            <Link
              className={cn(
                buttonVariants({
                  className: 'w-full justify-start gap-4 rounded-tl-none rounded-bl-none pr-12',
                  variant: 'ghost',
                }),
              )}
              onClick={onNavigationSelect}
              to={path}
            >
              {Icon ? <Icon /> : <Link1Icon />}
              <span>{title}</span>
            </Link>
          </li>
        ))}
    </ul>
  );
}
