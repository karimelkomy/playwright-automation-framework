import { test } from "@fixtures";
import { FormDetails } from "@data";

test("Submit form with valid data", async ({ landingPage, thankYouPage }) => {
  const formDetails = FormDetails();

  await test.step("Navigate to landing page", async () => {
    await landingPage.goto();
  });

  await test.step("Submit ZIP code step", async () => {
    await landingPage.submitZipCodeStep({ formDetails });
  });

  await test.step("Submit interest step", async () => {
    await landingPage.submitInterestStep({ formDetails });
  });

  await test.step("Submit property type step", async () => {
    await landingPage.submitPropertyTypeStep({ formDetails });
  });

  await test.step("Submit name and email step", async () => {
    await landingPage.submitContactInfoStep({ formDetails });
  });

  await test.step("Submit phone step", async () => {
    await landingPage.submitPhoneStep({ formDetails });
  });

  await test.step("Validate thank you page", async () => {
    await thankYouPage.validateThankYouPage();
  });
});
