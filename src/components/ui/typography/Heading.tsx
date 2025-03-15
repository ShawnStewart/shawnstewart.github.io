import type { HTMLAttributes, PropsWithChildren } from 'react';
import { createContext, createElement, useContext } from 'react';

import { cn } from '@/lib/utils';

type HeadingLevel = 1 | 2 | 3 | 4 | 5;

const HeadingLevelContext = createContext<HeadingLevel>(1);

const headingStyles = {
  1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
  3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  5: '',
} satisfies Record<HeadingLevel, string>;

export function useHeadingLevel() {
  return useContext(HeadingLevelContext);
}

export function HeadingLevel({ children }: PropsWithChildren) {
  const parentLevel = useHeadingLevel();
  const currentLevel = Math.min(parentLevel + 1, 5) as HeadingLevel;

  return (
    <HeadingLevelContext.Provider value={currentLevel}>{children}</HeadingLevelContext.Provider>
  );
}

export function Heading({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  const level = useHeadingLevel();
  const styles = headingStyles[level];
  return createElement(`h${level}`, { ...props, className: cn(styles, className) }, children);
}
