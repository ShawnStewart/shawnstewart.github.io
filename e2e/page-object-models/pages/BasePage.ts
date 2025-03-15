import { Page } from '..';
import { PageHeaderObject } from '../page-objects/PageHeaderObject';
import { ThemeObject } from '../page-objects/ThemeObject';

export class BasePage extends Page {
  public readonly pageHeader: PageHeaderObject;
  public readonly theme: ThemeObject;

  constructor(...args: ConstructorParameters<typeof Page>) {
    super(...args);
    this.pageHeader = new PageHeaderObject(this.page);
    this.theme = new ThemeObject(this.page);
  }
}
