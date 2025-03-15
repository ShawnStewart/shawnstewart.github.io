import { loaderDefaultOptions } from '@/config';

import { asyncComponentLoader } from './loader';
import type { ComponentTypeAny, ConfiguredLoadComponentAsyncConfig } from './types';

function configuredAsyncComponentLoader<C extends ComponentTypeAny>(
  passedOptions: ConfiguredLoadComponentAsyncConfig<C>,
) {
  const options: Parameters<typeof asyncComponentLoader>[0] = {
    ...loaderDefaultOptions,
    ...passedOptions,
  };
  return asyncComponentLoader(options);
}

export { configuredAsyncComponentLoader as asyncComponentLoader, loaderDefaultOptions };
