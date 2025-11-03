import { test, expect } from '@playwright/test';

test('user registration success + error states', async ({ page }) => {
  await page.goto('/');

  await page.locator('#name').fill('Jane User');
  await page.locator('#email').fill('jane@example.com');
  await page.locator('#accountType').fill('premium');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.locator('#userMsg')).toContainText('User OK');

  await page.locator('#email').fill('not-an-email');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.locator('#userMsg')).toContainText('Error');
});
