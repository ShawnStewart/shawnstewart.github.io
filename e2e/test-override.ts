// eslint-disable-next-line no-restricted-imports
import { test as baseTest } from '@playwright/test';

import { BasePage } from './page-object-models/pages/BasePage';

interface Fixtures {
  basePage: BasePage;
}

export const test = baseTest.extend<Fixtures>({
  basePage: async ({ page }, runTest) => {
    const basePage = new BasePage({ page });
    await basePage.open();
    await runTest(basePage);
  },
});

export { expect } from '@playwright/test';
