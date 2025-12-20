import { test } from "@fixtures";
import { FormDetails, invalidPhones } from "@data";

test("Validate invalid phone number", async ({ landingPage }) => {
  const formDetails = FormDetails();

  await test.step("Navigate to landing page", async () => {
    await landingPage.goto();
  });

  for (const invalidPhone of invalidPhones) {
    await test.step("Navigate to phone step", async () => {
      await landingPage.submitZipCodeStep({ formDetails });
      await landingPage.submitInterestStep({ formDetails });
      await landingPage.submitPropertyTypeStep({ formDetails });
      await landingPage.submitContactInfoStep({ formDetails });
    });

    await test.step(`Validate invalid phone number "${invalidPhone}" are rejected`, async () => {
      await landingPage.fillPhone({ phone: invalidPhone });
      await landingPage.clickSubmitYourRequest();
      await landingPage.validateWrongEmptyPhoneNumber();
      await landingPage.validateLastStep();
      await landingPage.refreshPage();
    });
  }
});
