import { expect } from '@playwright/test';

export function expectValidEmail(email) {
  expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}
