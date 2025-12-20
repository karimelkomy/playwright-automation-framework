import { BasePage } from "@components";
import { urlPaths } from "@data";
import { Page } from "@playwright/test";

export class LandingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigateTo(urlPaths.LandingPage);
    await this.validateZipCodeStep();
  }

  async validateStep(expectedTitle: string) {
    await this.validateContain(
      this.locator("#form-container-1")
        .locator(".stepTitle")
        .filter({ visible: true }),
      expectedTitle
    );
  }

  async validateNotStep(notExpectedTitle: string) {
    await this.validateNotContain(
      this.locator("#form-container-1")
        .locator(".stepTitle")
        .filter({ visible: true }),
      notExpectedTitle
    );
  }

  async validateZipCodeStep() {
    await this.validateStep("What is your ZIP Code?");
  }

  async validateNotZipCodeStep() {
    await this.validateNotStep("What is your ZIP Code?");
  }

  async validateInterestStep() {
    await this.validateStep("Why are you interested in a walk-in tub?");
  }

  async validateNotInterestStep() {
    await this.validateNotStep("Why are you interested in a walk-in tub?");
  }

  async validatePropertyTypeStep() {
    await this.validateStep("What type of property is this");
  }

  async validateNotPropertyTypeStep() {
    await this.validateNotStep("What type of property is this");
  }

  async validateContactInfoStep() {
    await this.validateStep("Who should we prepare this FREE estimate for?");
  }

  async validateNotContactInfoStep() {
    await this.validateNotStep("Who should we prepare this FREE estimate for?");
  }

  async validateLastStep() {
    await this.validateStep("LAST STEP!");
  }

  async validateNotLastStep() {
    await this.validateNotStep("LAST STEP!");
  }

  async validateWrongEmptyPhoneNumber() {
    await this.validateMatch(
      this.locator("#form-container-1").locator("[data-error-block] div"),
      /Wrong phone number.|Enter your phone number./
    );
  }

  async clickSubmitStep(name: string) {
    await this.click(
      this.locator("#form-container-1").getByRole("button", { name })
    );
  }

  async clickNext() {
    await this.clickSubmitStep("Next");
  }

  async clickGoToEstimate() {
    await this.clickSubmitStep("Go To Estimate");
  }

  async clickSubmitYourRequest() {
    await this.clickSubmitStep("Submit Your Request");
  }

  async fillZipCode({ zipCode }: { zipCode: string }) {
    await this.fill(
      this.locator("#form-container-1").getByRole("textbox", {
        name: "Enter ZIP Code",
      }),
      zipCode
    );
  }

  async selectInterestReasons({ interests }: { interests: string[] }) {
    for (const interest of interests) {
      await this.click(this.locator("#form-container-1").getByText(interest));
    }
  }

  async selectPropertyType({ propertyType }: { propertyType: string }) {
    await this.click(this.locator("#form-container-1").getByText(propertyType));
  }

  async fillName({ name }: { name: string }) {
    await this.fill(
      this.locator("#form-container-1").getByRole("textbox", {
        name: "Enter Your Name",
      }),
      name
    );
  }

  async fillEmail({ email }: { email: string }) {
    await this.fill(
      this.locator("#form-container-1").getByRole("textbox", {
        name: "Enter Your Email",
      }),
      email
    );
  }

  async fillPhone({ phone }: { phone: string }) {
    await this.fill(
      this.locator("#form-container-1").getByRole("textbox", {
        name: "(XXX)XXX-XXXX",
      }),
      phone
    );
  }

  async submitZipCodeStep({
    formDetails,
  }: {
    formDetails: FormDetailsInterface;
  }) {
    const { zipCode } = formDetails;

    await this.validateZipCodeStep();
    await this.fillZipCode({ zipCode });
    await this.clickNext();
  }

  async submitInterestStep({
    formDetails,
  }: {
    formDetails: FormDetailsInterface;
  }) {
    const { interests } = formDetails;

    await this.validateInterestStep();
    await this.selectInterestReasons({ interests });
    await this.clickNext();
  }

  async submitPropertyTypeStep({
    formDetails,
  }: {
    formDetails: FormDetailsInterface;
  }) {
    const { propertyType } = formDetails;

    await this.validatePropertyTypeStep();
    await this.selectPropertyType({ propertyType });
    await this.clickNext();
  }

  async submitContactInfoStep({
    formDetails,
  }: {
    formDetails: FormDetailsInterface;
  }) {
    const { fullName, email } = formDetails;

    await this.validateContactInfoStep();
    await this.fillName({ name: fullName });
    await this.fillEmail({ email });
    await this.clickGoToEstimate();
  }

  async submitPhoneStep({
    formDetails,
  }: {
    formDetails: FormDetailsInterface;
  }) {
    const { phone } = formDetails;

    await this.validateLastStep();
    await this.fillPhone({ phone });
    await this.clickSubmitYourRequest();
  }
}
