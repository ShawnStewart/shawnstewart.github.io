import type { ReactNode } from 'react';

interface MetaProps {
  description?: string;
  meta?: { name: string; content: string }[];
  title?: string;
  image?: string;
  children?: ReactNode;
}

export type { MetaProps };
