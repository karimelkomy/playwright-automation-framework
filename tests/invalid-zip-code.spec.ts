import { test, expect } from "@fixtures";
import { invalidZipCodes, stepTitles } from "@data";

test.describe("Invalid zip code validation", () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto();
  });

  for (const invalidZipCode of invalidZipCodes) {
    test(`should reject invalid zip code: "${invalidZipCode || "(empty)"}"`, async ({
      landingPage,
    }) => {
      await landingPage.fillZipCode({ zipCode: invalidZipCode });
      await landingPage.clickNext();

      await expect(landingPage.stepTitle).not.toContainText(stepTitles.interest);
      await expect(landingPage.stepTitle).toContainText(stepTitles.zipCode);
    });
  }
});
