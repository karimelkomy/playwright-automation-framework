import { BasePage } from "@components";
import { urlPaths } from "@data";
import { Page } from "@playwright/test";

export class LandingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get formContainer() {
    return this.locator("#form-container-1");
  }

  get stepTitle() {
    return this.formContainer.locator(".stepTitle").filter({ visible: true });
  }

  get errorMessage() {
    return this.formContainer.locator("[data-error-block] div");
  }

  private get zipCodeInput() {
    return this.formContainer.getByRole("textbox", { name: "Enter ZIP Code" });
  }

  private get nameInput() {
    return this.formContainer.getByRole("textbox", { name: "Enter Your Name" });
  }

  private get emailInput() {
    return this.formContainer.getByRole("textbox", {
      name: "Enter Your Email",
    });
  }

  private get phoneInput() {
    return this.formContainer.getByRole("textbox", { name: "(XXX)XXX-XXXX" });
  }

  private get nextButton() {
    return this.formContainer.getByRole("button", { name: "Next" });
  }

  private get goToEstimateButton() {
    return this.formContainer.getByRole("button", { name: "Go To Estimate" });
  }

  private get submitRequestButton() {
    return this.formContainer.getByRole("button", {
      name: "Submit Your Request",
    });
  }

  async goto() {
    await this.navigateTo(urlPaths.LandingPage);
    await this.waitFor(this.stepTitle);
  }

  async clickNext() {
    await this.click(this.nextButton);
  }

  async clickGoToEstimate() {
    await this.click(this.goToEstimateButton);
  }

  async clickSubmitYourRequest() {
    await this.click(this.submitRequestButton);
  }

  async fillZipCode({ zipCode }: { zipCode: string }) {
    await this.fill(this.zipCodeInput, zipCode);
  }

  async fillName({ name }: { name: string }) {
    await this.fill(this.nameInput, name);
  }

  async fillEmail({ email }: { email: string }) {
    await this.fill(this.emailInput, email);
  }

  async fillPhone({ phone }: { phone: string }) {
    await this.fill(this.phoneInput, phone);
  }

  async selectInterestReasons({ interests }: { interests: string[] }) {
    for (const interest of interests) {
      await this.click(this.formContainer.getByText(interest));
    }
  }

  async selectPropertyType({ propertyType }: { propertyType: string }) {
    await this.click(this.formContainer.getByText(propertyType));
  }

  async submitZipCodeStep({
    formDetails,
  }: {
    formDetails: FormDetailsInterface;
  }) {
    await this.waitFor(this.stepTitle);
    await this.fillZipCode({ zipCode: formDetails.zipCode });
    await this.clickNext();
  }

  async submitInterestStep({
    formDetails,
  }: {
    formDetails: FormDetailsInterface;
  }) {
    await this.waitFor(this.stepTitle);
    await this.selectInterestReasons({ interests: formDetails.interests });
    await this.clickNext();
  }

  async submitPropertyTypeStep({
    formDetails,
  }: {
    formDetails: FormDetailsInterface;
  }) {
    await this.waitFor(this.stepTitle);
    await this.selectPropertyType({ propertyType: formDetails.propertyType });
    await this.clickNext();
  }

  async submitContactInfoStep({
    formDetails,
  }: {
    formDetails: FormDetailsInterface;
  }) {
    await this.waitFor(this.stepTitle);
    await this.fillName({ name: formDetails.fullName });
    await this.fillEmail({ email: formDetails.email });
    await this.clickGoToEstimate();
  }

  async submitPhoneStep({
    formDetails,
  }: {
    formDetails: FormDetailsInterface;
  }) {
    await this.waitFor(this.stepTitle);
    await this.fillPhone({ phone: formDetails.phone });
    await this.clickSubmitYourRequest();
  }
}
