import { Page, expect, Locator } from "@playwright/test";
import { timeouts } from "config/timeouts";

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  locator(selector: string) {
    return this.page.locator(selector);
  }

  getByRole(role: any, options?: any) {
    return this.page.getByRole(role, options);
  }

  getByText(text: string | RegExp, options?: { exact?: boolean }) {
    return this.page.getByText(text, options);
  }

  getByTestId(testId: string) {
    return this.page.getByTestId(testId);
  }

  getByLabel(label: string | RegExp, options?: { exact?: boolean }) {
    return this.page.getByLabel(label, options);
  }

  getByPlaceholder(
    placeholder: string | RegExp,
    options?: { exact?: boolean }
  ) {
    return this.page.getByPlaceholder(placeholder, options);
  }

  async navigateTo(url: string) {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: timeouts.medium,
    });
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async refreshPage() {
    await this.page.reload({ waitUntil: "domcontentloaded" });
  }

  async waitForUrlContains(
    desiredUrl: string,
    timeout: number = timeouts.medium
  ) {
    try {
      await this.page.waitForURL(new RegExp(`.*${desiredUrl}.*`), { timeout });
    } catch {
      throw new Error(
        `waitForUrlContains failed - Current URL: ${await this.getCurrentUrl()} does not contain: ${desiredUrl}`
      );
    }
  }

  async wait(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000);
  }

  async click(locator: Locator) {
    await this.waitFor(locator);

    try {
      await locator.click();
    } catch (error) {
      throw new Error(
        `Click failed - Current URL: ${await this.getCurrentUrl()}\nError: ${error}`
      );
    }
  }

  async fill(locator: Locator, value: string) {
    await locator.click();

    try {
      await locator.fill(value);
    } catch (error) {
      throw new Error(
        `Fill failed - Current URL: ${await this.getCurrentUrl()}\nError: ${error}`
      );
    }
  }

  async getText(locator: Locator): Promise<string> {
    await this.waitFor(locator);

    try {
      const text = await locator.innerText();

      return text.trim();
    } catch (error) {
      throw new Error(
        `getText failed - Current URL: ${await this.getCurrentUrl()}\nError: ${error}`
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
        `waitFor failed - Current URL: ${await this.getCurrentUrl()}\nError: ${error}`
      );
    }
  }

  async validateContain(locator: Locator, expected: any) {
    await this.waitFor(locator);

    try {
      await expect
        .poll(() => this.getText(locator), { timeout: timeouts.short })
        .toContain(expected);
    } catch (error) {
      throw new Error(
        `validateContain failed - Current URL: ${await this.getCurrentUrl()}\nExpected:${JSON.stringify(
          expected
        )}\nError: ${error}`
      );
    }
  }

  async validateNotContain(locator: Locator, expected: any) {
    await this.waitFor(locator);

    try {
      await expect
        .poll(() => this.getText(locator), { timeout: timeouts.short })
        .not.toContain(expected);
    } catch (error) {
      throw new Error(
        `validateNotContain failed - Current URL: ${await this.getCurrentUrl()}\Not contain:${JSON.stringify(
          expected
        )}\nError: ${error}`
      );
    }
  }

  async validateMatch(locator: Locator, pattern: RegExp) {
    await this.waitFor(locator);

    try {
      await expect
        .poll(() => this.getText(locator), { timeout: timeouts.short })
        .toMatch(pattern);
    } catch (error) {
      throw new Error(
        `validateMatch failed - Current URL: ${await this.getCurrentUrl()}\nPattern: ${pattern}\nError: ${error}`
      );
    }
  }
}
