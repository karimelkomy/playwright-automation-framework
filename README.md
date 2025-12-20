# QA Automation Challenge

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Scenario Selection Rationale](#scenario-selection-rationale)
- [Scalability and Maintainability Improvements](#scalability-and-maintainability-improvements)
- [Additional Improvements](#additional-improvements)

## Overview

This project contains automated tests for form at `https://test-qa.capslock.global`.

1. **ZIP Code** - 5-digit postal code validation
2. **Interests** - Multiple selection options
3. **Property Type** - Single selection option
4. **Name and Email Information** - Name, and email
5. **Phone Information** - Phone number

### Form Requirements

- All fields are required
- ZIP code must contain exactly 5 digits
- Email must match a valid email pattern (e.g., user@example.com)
- Phone number must contain exactly 10 digits
- After successful submission, the user is redirected to a "Thank you" page

## Installation

### Prerequisites

- Node.js (v20.18.2)

### Setup Instructions

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

4. Install Playwright browsers:
   ```bash
   npx playwright install
   ```


### Environment Setup

#### Required `.env` Parameters:

```env
BROWSER=                       # Browser (Chrome, Firefox or Safari)
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode

```bash
npm run test
```

### Run Tests in Headless Mode

```bash
npm run test:headless
```

### Run Allure Report

```bash
npm run report
```


## Project Structure

```
qa-automation-challenge/
 ├── .claude/agents    # Playwright agents
 ├── allure/           # Allure reports folder
 ├── config/           # Configurations
 ├── core/             # Core components
 ├── data/             # Test data
 ├── fixtures/         # Fixtures for test data
 ├── interfaces/       # TypeScript interfaces
 ├── pages/            # Page Object Model (POM)
 ├── tests/            # Test files
 ├── playwright.config.ts # Playwright configuration
 ├── package.json         # Node.js dependencies
 ├── README.md            # Project documentation
 ├── tsconfig.json        # TypeScript configuration
```

## Architecture

### Page Object Model (POM)

The project follows the Page Object Model pattern for better maintainability and reusability.

## Scenario Selection Rationale

### Why I Selected These Scenarios

I focused on the most critical parts of the form that could break the user journey:

1. **Valid Form Submission** - This is the main flow. If this doesn't work, users can't submit anything.

2. **ZIP Code Validation** - First step in the form. If it accepts wrong data or blocks valid input, users either get stuck or we get bad data.

3. **Email Validation** - Without valid email, we can't contact the user. Tested common mistakes like missing @, spaces, etc.

4. **Phone Validation** - Last step before submit. Important to validate the format correctly.

5. **Name Validation** - Found that it needs full name (first + last), not just first name. This should be clearer in the UI.

6. **Required Fields** - All fields should be mandatory per requirements. Made sure form doesn't progress with empty fields.

### What I Didn't Automate

- Interest and property type selections - these are simple clicks without validation logic
- Visual testing - not in the requirements
- Cross-browser testing - can be added later but focused on Chrome first

## Scalability and Maintainability Improvements

### What's Already Good

- Page Object Model separates test logic from page interactions
- Faker.js generates random data so tests don't conflict
- TypeScript helps catch errors early
- Allure gives good reports

### What Could Be Added

1. **API setup** - Use APIs to create test data instead of going through UI every time. Much faster.

2. **Environment config** - Right now baseURL is hardcoded. Should support dev/staging/prod environments.

3. **Test tags** - Add @smoke, @regression tags to run different test sets.

4. **Retry mechanism** - Add retries in CI to handle flaky network issues.

5. **Parallel execution** - Tests are already isolated, can run them in parallel to save time.

## Additional Improvements

### Playwright Agents

I added Playwright MCP Agents to the project (in `.claude/agents/` folder). These work with Claude Code and can help with:

- **Test Planner** - Explores the app and creates test plans
- **Test Generator** - Generates test code from plans
- **Test Healer** - Fixes broken tests when selectors change

This is useful because maintaining locators is one of the biggest pain points in automation. When UI changes, these agents can help update the tests automatically.

### Bugs Found

During testing I found some issues with the form:
- Form doesn't progress after clicking Next with zip code 12345
- Duplicate forms on the page
- Name field doesn't clearly show that full name is required

## Author

This project is maintained by Karim Elkomy
