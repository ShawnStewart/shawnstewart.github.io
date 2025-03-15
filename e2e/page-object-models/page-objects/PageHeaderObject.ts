import type { Locator, Page } from '@playwright/test';

import { PageObject } from '..';

export class PageHeaderObject extends PageObject {
  public readonly hotkeysDialog: Locator;
  public readonly hotkeysDialogToggleButton: Locator;
  public readonly navigationMenu: Locator;
  public readonly navigationMenuToggleButton: Locator;
  public readonly themeToggleButton: Locator;

  constructor(page: Page) {
    super(page.getByRole('banner'));

    this.hotkeysDialog = page.getByRole('dialog', { name: 'Hotkeys menu' });
    this.hotkeysDialogToggleButton = this.host.getByLabel('Open hotkeys dialog');
    this.navigationMenu = page.getByRole('dialog', { name: 'Navigation menu' });
    this.navigationMenuToggleButton = this.host.getByLabel('Navigation menu');
    this.themeToggleButton = this.host.getByLabel('Theme toggle');
  }
}
