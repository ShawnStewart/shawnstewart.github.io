import type { ComponentType } from 'react';

import type { HasRequiredKey } from '../type-utils';

export interface LoaderOptions {
  delay: number;
  minimumLoading: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentTypeAny = ComponentType<any>;

export type InferComponentProps<C extends ComponentTypeAny> = C extends ComponentType<void>
  ? undefined
  : C extends ComponentType<infer P>
    ? P extends object
      ? P
      : never
    : never;

type ComponentHasRequiredProps<
  C extends ComponentTypeAny,
  P = InferComponentProps<C>,
> = HasRequiredKey<P> extends true ? P : never;

export interface LoaderDefaultOptions {
  FallbackComponent?: ComponentType;
  delay?: number;
  minimumLoading?: number;
}

export type LoadComponentAsyncConfig<
  C extends ComponentTypeAny,
  P = InferComponentProps<C>,
> = Required<LoaderDefaultOptions> & {
  loadComponentAsync: () => Promise<{ default: C }>;
} & (P extends undefined
    ? { loadComponentProps?: never }
    : P extends never
      ? { loadComponentProps?: never }
      : ComponentHasRequiredProps<C, P> extends never
        ? { loadComponentProps?: P }
        : { loadComponentProps: P });

export type ConfiguredLoadComponentAsyncConfig<C extends ComponentTypeAny> = LoaderDefaultOptions &
  Omit<LoadComponentAsyncConfig<C>, keyof LoaderDefaultOptions>;
