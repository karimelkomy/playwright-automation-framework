import { test as base, expect } from "@playwright/test";
import { LandingPage } from "@pages/LandingPage";
import { ThankYouPage } from "@pages/ThankYouPage";

export { expect };

export const test = base.extend<{
  landingPage: LandingPage;
  thankYouPage: ThankYouPage;
}>({
  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
  },

  thankYouPage: async ({ page }, use) => {
    const thankYouPage = new ThankYouPage(page);
    await use(thankYouPage);
  },
});
