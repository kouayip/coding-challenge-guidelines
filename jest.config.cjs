/** @type {import('jest').Config} */
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  // A set of global variables that need to be available in all test environments
  globals: {
    IS_REACT_ACT_ENVIRONMENT: true,
  },

  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': '@swc/jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
