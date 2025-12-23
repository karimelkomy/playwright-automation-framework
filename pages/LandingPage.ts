import { BasePage } from "@components";
import { urlPaths } from "@data";
import { Locator, Page } from "@playwright/test";
import { FormDetailsInterface } from "interfaces/FormDetailsInterface";

export class LandingPage extends BasePage {
  private readonly formContainer: Locator;
  readonly stepTitle: Locator;
  readonly errorMessage: Locator;
  private readonly zipCodeInput: Locator;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly phoneInput: Locator;
  private readonly nextButton: Locator;
  private readonly goToEstimateButton: Locator;
  private readonly submitRequestButton: Locator;

  constructor(page: Page) {
    super(page);
    this.formContainer = page.locator("#form-container-1");
    this.stepTitle = this.formContainer.locator(".stepTitle").filter({ visible: true });
    this.errorMessage = this.formContainer.locator("[data-error-block] div");
    this.zipCodeInput = this.formContainer.getByRole("textbox", { name: "Enter ZIP Code" });
    this.nameInput = this.formContainer.getByRole("textbox", { name: "Enter Your Name" });
    this.emailInput = this.formContainer.getByRole("textbox", { name: "Enter Your Email" });
    this.phoneInput = this.formContainer.getByRole("textbox", { name: "(XXX)XXX-XXXX" });
    this.nextButton = this.formContainer.getByRole("button", { name: "Next" });
    this.goToEstimateButton = this.formContainer.getByRole("button", { name: "Go To Estimate" });
    this.submitRequestButton = this.formContainer.getByRole("button", { name: "Submit Your Request" });
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
