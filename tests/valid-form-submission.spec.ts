import { test, expect } from "@fixtures";
import { FormDetails } from "@data";

const formDetails = FormDetails();

test.describe("Form submission", () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto();
  });

  test("should successfully submit form with valid data", async ({
    landingPage,
    thankYouPage,
  }) => {
    await landingPage.submitZipCodeStep({ formDetails });
    await landingPage.submitInterestStep({ formDetails });
    await landingPage.submitPropertyTypeStep({ formDetails });
    await landingPage.submitContactInfoStep({ formDetails });
    await landingPage.submitPhoneStep({ formDetails });

    await thankYouPage.waitForThankYouPage();
    await expect(thankYouPage.heading).toContainText("Thank you!");
  });
});
