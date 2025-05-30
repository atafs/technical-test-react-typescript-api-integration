// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Required for React components
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional setup file
};
