import { BasePage } from "@components";
import { urlPaths } from "@data";
import { Page } from "@playwright/test";

export class ThankYouPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async validateThankYouPage() {
    await this.waitForUrlContains(urlPaths.thankYou);

    await this.validateContain(this.page.getByRole("heading"), "Thank you!");
  }
}
