import { BasePage } from "@components";
import { urlPaths } from "@data";
import { Page } from "@playwright/test";

export class ThankYouPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading() {
    return this.page.getByRole("heading");
  }

  get thankYouUrl() {
    return urlPaths.thankYou;
  }

  async waitForThankYouPage() {
    await this.waitForUrlContains(urlPaths.thankYou);
  }
}
