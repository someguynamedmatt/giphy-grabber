const nextJest = require('next/jest')

const initConfig = nextJest({ dir: '.' })

const config = {
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = initConfig(config)
