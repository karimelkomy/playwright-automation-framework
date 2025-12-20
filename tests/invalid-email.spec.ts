import { test } from "@fixtures";
import { FormDetails, invalidEmails } from "@data";

test("Validate invalid email format", async ({ landingPage }) => {
  const formDetails = FormDetails();

  await test.step("Navigate to landing page", async () => {
    await landingPage.goto();
  });

  for (const invalidEmail of invalidEmails) {
    await test.step(`Navigate to email step`, async () => {
      await landingPage.submitZipCodeStep({ formDetails });
      await landingPage.submitInterestStep({ formDetails });
      await landingPage.submitPropertyTypeStep({ formDetails });
    });

    await test.step(`Validate invalid email format "${invalidEmail}" are rejected`, async () => {
      await landingPage.fillName({ name: formDetails.fullName });
      await landingPage.fillEmail({ email: invalidEmail });
      await landingPage.validateNotLastStep();
      await landingPage.validateContactInfoStep();
      await landingPage.refreshPage();
    });
  }
});
