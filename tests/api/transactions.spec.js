import { test, expect } from '@playwright/test';
import { apiContext } from '../../src/utils/helpers.js';
import { txFactory, userFactory } from '../../src/utils/factories.js';

let userId;

test.beforeAll(async () => {
  const api = await apiContext();
  const u = await api.post('/api/users', { data: userFactory() });
  const body = await u.json();
  userId = body.id;
});

test.describe('Transactions API', () => {
  test('create transaction (201) and list (200)', async () => {
    const api = await apiContext();

    const created = await api.post('/api/transactions', { data: txFactory({ userId }) });
    expect(created.status()).toBe(201);

    const list = await api.get(`/api/transactions/${userId}`);
    expect(list.status()).toBe(200);
    const items = await list.json();
    expect(Array.isArray(items)).toBeTruthy();
    expect(items[0]).toHaveProperty('amount');
  });

  test('validation error (400) - negative amount', async () => {
    const api = await apiContext();
    const res = await api.post('/api/transactions', { data: txFactory({ userId, amount: -1 }) });
    expect(res.status()).toBe(400);
  });
});
