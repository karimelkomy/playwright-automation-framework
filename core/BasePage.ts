import { Page, Locator } from "@playwright/test";
import { timeouts } from "config/timeouts";

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locator(selector: string) {
    return this.page.locator(selector);
  }

  async navigateTo(url: string) {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: timeouts.medium,
    });
  }

  async waitForUrlContains(
    desiredUrl: string,
    timeout: number = timeouts.medium
  ) {
    try {
      await this.page.waitForURL(new RegExp(`.*${desiredUrl}.*`), { timeout });
    } catch {
      throw new Error(
        `URL did not contain "${desiredUrl}" within ${timeout}ms. Current URL: ${this.page.url()}`
      );
    }
  }

  async waitFor(
    locator: Locator,
    state: "visible" | "hidden" | "attached" | "detached" = "visible",
    timeout: number = timeouts.medium
  ) {
    try {
      await locator.waitFor({ state, timeout });
    } catch (error) {
      throw new Error(
        `Element not ${state} within ${timeout}ms. Current URL: ${this.page.url()}\nError: ${error}`
      );
    }
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.click();
    await locator.fill(value);
  }
}
