import { test, expect } from '@playwright/test';

test('transaction success + validation error', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('User ID').fill('u-1');
  await page.getByLabel('Amount').fill('100.50');
  await page.getByLabel('Type').fill('transfer');
  await page.getByLabel('Recipient ID').fill('456');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#txMsg')).toContainText('Tx OK');

  await page.getByLabel('Amount').fill('-1');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#txMsg')).toContainText('Error');
});
