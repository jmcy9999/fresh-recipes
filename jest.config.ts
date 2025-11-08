import type { Config } from 'jest';

const config: Config = {
  rootDir: __dirname,                // 👈 anchor to repo root (where this file lives)
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/packages', '<rootDir>/apps'],
  modulePathIgnorePatterns: ['<rootDir>/.*/dist/'],
  testMatch: ['**/?(*.)+(spec|test).ts', '**/__tests__/**/*.ts'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/dist/**'],
  transform: { '^.+\\.tsx?$': 'ts-jest' }
};

export default config;