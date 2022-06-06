const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ["./setupTest.ts"],
  moduleNameMapper: {
    '@modules': '<rootDir>/modules/index',
    '@api': '<rootDir>/api/index',
  }
}

module.exports = createJestConfig(customJestConfig)