import { test, expect } from '@playwright/test';
import { userFactory } from '../../src/utils/factories.js';

test('transaction success + validation error', async ({ page }) => {
  await page.goto('/');

  // ensure a valid user exists for the UI flow
  const create = await page.request.post('http://localhost:4000/api/users', { data: userFactory() , headers: { Authorization: 'Bearer test-token' } });
  const created = await create.json();
  await page.locator('#userId').fill(created.id);
  await page.locator('#amount').fill('100.50');
  await page.locator('#type').fill('transfer');
  await page.locator('#recipientId').fill('456');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#txMsg')).toContainText('Tx OK');

  await page.locator('#amount').fill('-1');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#txMsg')).toContainText('Error');
});
