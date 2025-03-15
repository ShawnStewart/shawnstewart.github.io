import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { PathRouteProps } from 'react-router-dom';

import type { ComponentTypeAny } from '@/utils/loader/types';

export enum Pages {
  Portfolio,
  ReactPWA,
  NotFound,
}

interface PathRouteCustomProps {
  title?: string;
  component: ComponentTypeAny;
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  path: string;
}

export type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;
