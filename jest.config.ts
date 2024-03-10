/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchPathIgnorePatterns: [
    '<rootDir>/src/utils/*.ts',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/utils/*.ts',
  ],
};
