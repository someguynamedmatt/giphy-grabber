const nextJest = require('next/jest')

const initConfig = nextJest({ dir: '.' })

const config = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/components/$1',
    '^@/fixtures(.*)$': '<rootDir>/src/fixtures/$1',
    '^@/hooks(.*)$': '<rootDir>/src/hooks/$1',
    '^@/providers(.*)$': '<rootDir>/src/providers/$1',
    '^@/styles(.*)$': '<rootDir>/src/styles/$1',
    '^@/utils(.*)$': '<rootDir>/src/utils/$1',
  },
}

module.exports = initConfig(config)
