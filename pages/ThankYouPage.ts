import { BasePage } from "@components";
import { urlPaths } from "@data";
import { Locator, Page } from "@playwright/test";

export class ThankYouPage extends BasePage {
  readonly heading: Locator;
  readonly thankYouUrl: string;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole("heading");
    this.thankYouUrl = urlPaths.thankYou;
  }

  async waitForThankYouPage() {
    await this.waitForUrlContains(urlPaths.thankYou);
  }
}
