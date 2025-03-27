import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { LucideProps } from 'lucide-react';
import type { PathRouteProps } from 'react-router-dom';

import type { ComponentTypeAny } from '@/utils/loader/types';

export enum Pages {
  Portfolio,
  NewPortfolio,
  ReactPWA,
  NotFound,
}

type IconComponent<Props> = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<SVGSVGElement>
>;

interface PathRouteCustomProps {
  title?: string;
  component: ComponentTypeAny;
  icon?: IconComponent<IconProps> | IconComponent<LucideProps>;
  path: string;
}

export type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;
