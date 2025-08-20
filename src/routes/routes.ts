import { Hammer, Sparkles } from 'lucide-react';

import { asyncComponentLoader } from '@/utils/loader';

import type { Routes } from './types';

export const routes: Routes = [
  {
    component: asyncComponentLoader({
      loadComponentAsync: () => import('@/pages/Portfolio'),
    }),
    icon: Sparkles,
    path: '/',
    title: 'Portfolio',
  },
  {
    component: asyncComponentLoader({
      loadComponentAsync: () => import('@/pages/ReactPWA'),
    }),
    icon: Hammer,
    path: '/react-pwa',
    title: 'This template',
  },
  {
    component: asyncComponentLoader({
      loadComponentAsync: () => import('@/pages/NotFound'),
    }),
    path: '*',
  },
];
