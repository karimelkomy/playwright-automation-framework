# Playwright Automation Framework

A production-ready Playwright automation framework built with TypeScript, following best practices for test automation.

## Features

- **Page Object Model (POM)** - Clean separation of page interactions and test logic
- **TypeScript** - Type safety and better IDE support
- **Custom Fixtures** - Reusable test setup with Playwright fixtures
- **Data-Driven Testing** - Parameterized tests with external test data
- **Allure Reporting** - Beautiful test reports with screenshots and videos
- **Parallel Execution** - Tests run in parallel for faster feedback
- **CI/CD Ready** - Configured for continuous integration

## Project Structure

```
├── config/           # Configuration (timeouts, URLs)
├── core/             # Base classes (BasePage)
├── data/             # Test data and constants
├── fixtures/         # Custom Playwright fixtures
├── interfaces/       # TypeScript interfaces
├── pages/            # Page Object classes
├── tests/            # Test specifications
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd playwright-automation-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests (headed mode)
npm test

# Run tests in headless mode
npm run test:headless

# Run specific test file
npx playwright test tests/valid-form-submission.spec.ts

# Run tests with specific browser
npx playwright test --project=Chrome
```

### Viewing Reports

```bash
# Generate and open Allure report
npm run report
```

## Framework Architecture

### BasePage

The `BasePage` class provides common methods for all page objects:

```typescript
class BasePage {
  locator(selector: string)           // Create a locator
  navigateTo(url: string)             // Navigate with default options
  waitFor(locator, state, timeout)    // Wait for element state
  waitForUrlContains(url)             // Wait for URL pattern
  click(locator)                      // Click element
  fill(locator, value)                // Fill input field
}
```

### Page Objects

Page objects encapsulate page-specific locators and actions:

```typescript
class LandingPage extends BasePage {
  // Locators as getters
  get stepTitle() { return this.formContainer.locator(".stepTitle"); }

  // Actions
  async fillEmail({ email }) { await this.fill(this.emailInput, email); }

  // Composite workflows
  async submitContactInfoStep({ formDetails }) { /* ... */ }
}
```

### Test Structure

Tests follow a consistent pattern with `describe` blocks and `beforeEach` hooks:

```typescript
test.describe("Feature name", () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto();
  });

  test("should do something", async ({ landingPage }) => {
    // Test actions and assertions
  });
});
```

### Custom Fixtures

Custom fixtures provide page objects to tests:

```typescript
// fixtures/testFixtures.ts
export const test = base.extend<{
  landingPage: LandingPage;
  thankYouPage: ThankYouPage;
}>({
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
});
```

## Configuration

### Environment Variables

Create a `.env` file:

```env
BROWSER=Chrome    # Chrome, Firefox, or Safari
```

### Playwright Config

Key configuration options in `playwright.config.ts`:

- **Parallel execution** - Tests run in parallel by default
- **Retries** - Automatic retries for flaky tests in CI
- **Screenshots/Videos** - Captured on failure
- **Allure Reporter** - Integrated reporting

## Best Practices Used

1. **Test Isolation** - Each test runs independently
2. **No Hardcoded Waits** - Uses Playwright's auto-waiting
3. **Assertions in Tests** - Page objects don't contain assertions
4. **DRY Locators** - Locators defined once as getters
5. **Descriptive Test Names** - Clear, behavior-focused names
6. **Data Separation** - Test data in separate files

## Extending the Framework

### Adding a New Page Object

1. Create a new file in `pages/`
2. Extend `BasePage`
3. Define locators as getters
4. Add action methods

```typescript
// pages/NewPage.ts
import { BasePage } from "@components";

export class NewPage extends BasePage {
  private get submitButton() {
    return this.locator("#submit");
  }

  async clickSubmit() {
    await this.click(this.submitButton);
  }
}
```

### Adding to Fixtures

Update `fixtures/testFixtures.ts`:

```typescript
export const test = base.extend<{
  newPage: NewPage;
}>({
  newPage: async ({ page }, use) => {
    await use(new NewPage(page));
  },
});
```

## Author

Karim Elkomy

## License

MIT
