import { test } from "@fixtures";
import { FormDetails } from "@data";

test("Validate all fields are required", async ({ landingPage }) => {
  const formDetails = FormDetails();

  await test.step("Validate ZIP code field is required", async () => {
    await landingPage.goto();
    await landingPage.clickNext();
    await landingPage.validateNotInterestStep();
    await landingPage.validateZipCodeStep();
  });

  await test.step("Navigate to contact info step", async () => {
    await landingPage.fillZipCode({ zipCode: formDetails.zipCode });
    await landingPage.clickNext();
    await landingPage.submitInterestStep({ formDetails });
    await landingPage.submitPropertyTypeStep({ formDetails });
  });

  await test.step("Validate name and email are required", async () => {
    await landingPage.clickGoToEstimate();
    await landingPage.validateNotLastStep();
    await landingPage.validateContactInfoStep();
  });

  await test.step("Validate email is required when name is filled", async () => {
    await landingPage.fillName({ name: formDetails.fullName });
    await landingPage.clickGoToEstimate();
    await landingPage.validateNotLastStep();
    await landingPage.validateContactInfoStep();
  });

  await test.step("Validate phone is required", async () => {
    await landingPage.submitContactInfoStep({ formDetails });
    await landingPage.clickSubmitYourRequest();
    await landingPage.validateWrongEmptyPhoneNumber();
    await landingPage.validateLastStep();
  });
});
