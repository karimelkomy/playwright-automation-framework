import { test, expect } from "@fixtures";
import { FormDetails, invalidPhones, stepTitles } from "@data";

const formDetails = FormDetails();

test.describe("Invalid phone validation", () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.submitZipCodeStep({ formDetails });
    await landingPage.submitInterestStep({ formDetails });
    await landingPage.submitPropertyTypeStep({ formDetails });
    await landingPage.submitContactInfoStep({ formDetails });
  });

  for (const invalidPhone of invalidPhones) {
    test(`should reject invalid phone number: "${invalidPhone || "(empty)"}"`, async ({
      landingPage,
    }) => {
      await landingPage.fillPhone({ phone: invalidPhone });
      await landingPage.clickSubmitYourRequest();

      await expect(landingPage.errorMessage).toHaveText(/Wrong phone number.|Enter your phone number./);
      await expect(landingPage.stepTitle).toContainText(stepTitles.lastStep);
    });
  }
});
