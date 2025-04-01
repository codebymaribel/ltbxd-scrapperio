import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest", // Use ts-jest for TypeScript
  testEnvironment: "node", // Run tests in a Node.js environment
  testMatch: ["**/tests/**/*.test.ts"], // Look for test files in the `tests` folder
  collectCoverage: true, // Enable code coverage
  coverageDirectory: "coverage", // Output coverage reports to the `coverage` folder
  verbose: true, // Show detailed test results
  moduleNameMapper: {
    'puppeteer-autoscroll-down': '<rootDir>/tests/__mocks__/puppeteer-autoscroll-down.ts',
  }
};

export default config;