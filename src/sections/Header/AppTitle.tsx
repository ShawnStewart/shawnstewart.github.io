import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { title } from '@/config';
import { useToast } from '@/hooks/useToast';

import { getRandomJoke } from './utils';

export function AppTitle() {
  const { pathname } = useLocation();
  const { toast } = useToast();

  const isHomePage = pathname === '/';

  function showNotification() {
    if (!isHomePage) return;

    toast(getRandomJoke());
  }

  const button = (
    <Button onClick={showNotification} variant="ghost">
      {title}
    </Button>
  );

  return isHomePage ? button : <Link to="/">{button}</Link>;
}
