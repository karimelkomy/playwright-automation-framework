import { Project, defineConfig, devices } from "@playwright/test";
import { baseURL } from "config/urls";

const allProjects: Project[] = [
  {
    name: "Chrome",
    use: {
      browserName: "chromium",
      viewport: null,
      launchOptions: {
        args: [
          "--window-size=1680,1050",
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
      },
    },
  },
  {
    name: "Firefox",
    use: {
      browserName: "firefox",
      ...devices["Desktop Firefox"],
      viewport: { width: 1680, height: 1050 },
      launchOptions: {
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
      },
    },
  },
  {
    name: "Safari",
    use: {
      browserName: "webkit",
      ...devices["Desktop Safari"],
      viewport: { width: 1680, height: 1050 },
    },
  },
];

const browserEnv = (process.env.BROWSER || "Chrome").toLowerCase();
const selectedProjects = allProjects.filter(
  (project) => project.name?.toLowerCase() === browserEnv
);

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000,
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        resultsDir: "allure/allure-results",
        detail: false,
        suiteTitle: false,
      },
    ],
  ],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    ignoreHTTPSErrors: true,
  },
  projects: selectedProjects,
});
