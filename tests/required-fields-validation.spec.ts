import { test, expect } from "@fixtures";
import { FormDetails, stepTitles } from "@data";

const formDetails = FormDetails();

test.describe("Required fields validation", () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto();
  });

  test("should require ZIP code field", async ({ landingPage }) => {
    await landingPage.clickNext();

    await expect(landingPage.stepTitle).not.toContainText(stepTitles.interest);
    await expect(landingPage.stepTitle).toContainText(stepTitles.zipCode);
  });

  test("should require name and email fields", async ({ landingPage }) => {
    await landingPage.submitZipCodeStep({ formDetails });
    await landingPage.submitInterestStep({ formDetails });
    await landingPage.submitPropertyTypeStep({ formDetails });

    await landingPage.clickGoToEstimate();

    await expect(landingPage.stepTitle).not.toContainText(stepTitles.lastStep);
    await expect(landingPage.stepTitle).toContainText(stepTitles.contactInfo);
  });

  test("should require email when name is filled", async ({ landingPage }) => {
    await landingPage.submitZipCodeStep({ formDetails });
    await landingPage.submitInterestStep({ formDetails });
    await landingPage.submitPropertyTypeStep({ formDetails });

    await landingPage.fillName({ name: formDetails.fullName });
    await landingPage.clickGoToEstimate();

    await expect(landingPage.stepTitle).not.toContainText(stepTitles.lastStep);
    await expect(landingPage.stepTitle).toContainText(stepTitles.contactInfo);
  });

  test("should require phone field", async ({ landingPage }) => {
    await landingPage.submitZipCodeStep({ formDetails });
    await landingPage.submitInterestStep({ formDetails });
    await landingPage.submitPropertyTypeStep({ formDetails });
    await landingPage.submitContactInfoStep({ formDetails });

    await landingPage.clickSubmitYourRequest();

    await expect(landingPage.errorMessage).toHaveText(/Wrong phone number.|Enter your phone number./);
    await expect(landingPage.stepTitle).toContainText(stepTitles.lastStep);
  });
});
