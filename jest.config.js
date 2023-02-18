module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ["//node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/components/**/*.ts'],
  coverageReporters: ['text', 'html', 'json'],
  coverageDirectory: '<rootDir>/coverage/',
}
