import { test, expect } from "@fixtures";
import { FormDetails, stepTitles } from "@data";

const formDetails = FormDetails();

test.describe("Invalid name validation", () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.submitZipCodeStep({ formDetails });
    await landingPage.submitInterestStep({ formDetails });
    await landingPage.submitPropertyTypeStep({ formDetails });
  });

  test("should reject first name only (requires full name)", async ({ landingPage }) => {
    await landingPage.fillName({ name: formDetails.firstName });
    await landingPage.fillEmail({ email: formDetails.email });
    await landingPage.clickGoToEstimate();

    await expect(landingPage.stepTitle).not.toContainText(stepTitles.lastStep);
    await expect(landingPage.stepTitle).toContainText(stepTitles.contactInfo);
  });
});
