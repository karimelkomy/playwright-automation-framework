import { test } from "@fixtures";
import { invalidZipCodes } from "@data";

test("Validate invalid zip code", async ({ landingPage }) => {
  await test.step("Navigate to landing page", async () => {
    await landingPage.goto();
  });

  for (const invalidZipCode of invalidZipCodes) {
    await test.step(`Validate invalid zip code "${invalidZipCode}" are rejected`, async () => {
      await landingPage.fillZipCode({ zipCode: invalidZipCode });
      await landingPage.clickNext();
      await landingPage.validateNotInterestStep();
      await landingPage.validateZipCodeStep();
      await landingPage.refreshPage();
    });
  }
});
