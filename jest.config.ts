import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/packages', '<rootDir>/apps'],
  modulePathIgnorePatterns: ['<rootDir>/.*/dist/'],
testMatch: [
  '**/?(*.)+(spec|test).ts',
  '**/__tests__/**/*.ts'
],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/dist/**'],
};

export default config;