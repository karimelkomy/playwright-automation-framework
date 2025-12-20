import { test } from "@fixtures";
import { FormDetails } from "@data";

test("Validate invalid name", async ({ landingPage }) => {
  const formDetails = FormDetails();

  await test.step("Navigate to landing page", async () => {
    await landingPage.goto();
  });

  await test.step("Navigate to contact info step", async () => {
    await landingPage.submitZipCodeStep({ formDetails });
    await landingPage.submitInterestStep({ formDetails });
    await landingPage.submitPropertyTypeStep({ formDetails });
  });

  await test.step("Validate first name only is rejected", async () => {
    await landingPage.fillName({ name: formDetails.firstName });
    await landingPage.fillEmail({ email: formDetails.email });
    await landingPage.clickGoToEstimate();
    await landingPage.validateNotLastStep();
    await landingPage.validateContactInfoStep();
  });
});
