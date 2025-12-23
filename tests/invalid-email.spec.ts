import { test, expect } from "@fixtures";
import { FormDetails, invalidEmails, stepTitles } from "@data";

const formDetails = FormDetails();

test.describe("Invalid email validation", () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.submitZipCodeStep({ formDetails });
    await landingPage.submitInterestStep({ formDetails });
    await landingPage.submitPropertyTypeStep({ formDetails });
  });

  for (const invalidEmail of invalidEmails) {
    test(`should reject invalid email format: "${invalidEmail || "(empty)"}"`, async ({
      landingPage,
    }) => {
      await landingPage.fillName({ name: formDetails.fullName });
      await landingPage.fillEmail({ email: invalidEmail });

      await expect(landingPage.stepTitle).not.toContainText(stepTitles.lastStep);
      await expect(landingPage.stepTitle).toContainText(stepTitles.contactInfo);
    });
  }
});
