import { type Locator, type Page as PlaywrightPage } from '@playwright/test';

import { Page, PageObject } from '..';

class TechnologiesSectionObject extends PageObject {
  public readonly technologyCards: Locator[] = [];

  constructor(page: PlaywrightPage) {
    const technologiesSection = page
      .locator('section')
      .filter({ has: page.getByRole('heading', { name: 'Technologies used' }) });
    super(technologiesSection);

    this.technologyCards.push(
      this.getTechCard(page.getByRole('heading', { exact: true, name: 'React' })),
      this.getTechCard(page.getByRole('heading', { name: 'React Router' })),
      this.getTechCard(page.getByRole('heading', { name: 'Vite' })),
      this.getTechCard(page.getByRole('heading', { name: 'Progressive Web App' })),
      this.getTechCard(page.getByRole('heading', { name: 'TypeScript' })),
      this.getTechCard(page.getByRole('heading', { name: 'shadcn/ui' })),
    );
  }

  private getTechCard(cardLocator: Locator) {
    return this.host.getByRole('list').getByRole('listitem').filter({ has: cardLocator });
  }
}

export class WelcomePage extends Page {
  public readonly heading: Locator;
  public readonly technologyCards: Locator[];

  constructor(...args: ConstructorParameters<typeof Page>) {
    super(...args);

    this.heading = this.page.getByRole('heading', { name: 'Build a modern web application' });
    this.technologyCards = new TechnologiesSectionObject(this.page).technologyCards;
  }
}
