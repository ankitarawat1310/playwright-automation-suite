import { test, expect } from '@playwright/test';

test('transaction success + validation error', async ({ page }) => {
  await page.goto('/');

  await page.locator('#userId').fill('u-1');
  await page.locator('#amount').fill('100.50');
  await page.locator('#type').fill('transfer');
  await page.locator('#recipientId').fill('456');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#txMsg')).toContainText('Tx OK');

  await page.locator('#amount').fill('-1');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#txMsg')).toContainText('Error');
});
