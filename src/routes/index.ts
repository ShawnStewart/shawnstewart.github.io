import { GearIcon, PersonIcon } from '@radix-ui/react-icons';
import { Sparkles } from 'lucide-react';

import { asyncComponentLoader } from '@/utils/loader';

import type { Routes } from './types';
import { Pages } from './types';

export const routes: Routes = {
  [Pages.Portfolio]: {
    component: asyncComponentLoader({
      loadComponentAsync: () => import('@/pages/Portfolio'),
    }),
    icon: PersonIcon,
    path: '/',
    title: 'Portfolio',
  },
  [Pages.NewPortfolio]: {
    component: asyncComponentLoader({
      loadComponentAsync: () => import('@/pages/NewPortfolio'),
    }),
    icon: Sparkles,
    path: '/new-portfolio',
    title: 'New Portfolio',
  },
  [Pages.ReactPWA]: {
    component: asyncComponentLoader({
      loadComponentAsync: () => import('@/pages/ReactPWA'),
    }),
    icon: GearIcon,
    path: '/react-pwa',
    title: 'React PWA',
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader({
      loadComponentAsync: () => import('@/pages/NotFound'),
    }),
    path: '*',
  },
};
