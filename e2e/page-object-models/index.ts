import type { Locator, Page as PlaywrightPage } from '@playwright/test';

export abstract class PageObject {
  constructor(public readonly host: Locator) {}
}

export interface PageConstructorOptions {
  page: PlaywrightPage;
  url?: string;
}

export abstract class Page {
  protected readonly url: string;

  public readonly page: PlaywrightPage;

  constructor({ page, url = '/' }: PageConstructorOptions) {
    this.page = page;
    this.url = url;
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: 'networkidle' });
  }

  async close() {
    await this.page.close();
  }
}
