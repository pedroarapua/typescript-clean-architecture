/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");


module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "collectCoverageFrom": [
    '<rootDir>/src/**/*.ts'
  ],
  "coverageDirectory": 'coverage',
  "testEnvironment": 'node',
  "preset": '@shelf/jest-mongodb',
  "moduleNameMapper": pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" })
};