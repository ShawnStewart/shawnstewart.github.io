import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { PageObject } from '..';

export class ThemeObject extends PageObject {
  constructor(page: Page) {
    super(page.locator('html'));
  }

  async expectThemeToBeDark() {
    await expect(this.host).toHaveClass('dark');
  }

  async expectThemeToBeLight() {
    await expect(this.host).not.toHaveClass('dark');
  }
}
