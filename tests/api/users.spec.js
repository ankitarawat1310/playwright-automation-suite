import { test, expect } from '@playwright/test';
import { apiContext } from '../../src/utils/helpers.js';
import { userFactory } from '../../src/utils/factories.js';
import { expectValidEmail } from '../../src/utils/assertions.js';

let userId;

test.describe('Users API', () => {
  test('create user (201) and validate', async () => {
    const api = await apiContext();
    const payload = userFactory();

    const res = await api.post('/api/users', { data: payload });
    expect(res.status()).toBe(201);
    const body = await res.json();

    userId = body.id;
    expect(body).toMatchObject({ name: payload.name, accountType: payload.accountType });
    expectValidEmail(body.email);
  });

  test('get user (200)', async () => {
    const api = await apiContext();
    const res = await api.get(`/api/users/${userId}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(userId);
  });

  test('validation error (400) - invalid email', async () => {
    const api = await apiContext();
    const bad = userFactory({ email: 'not-an-email' });
    const res = await api.post('/api/users', { data: bad });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toContain('email');
  });

  test('auth required (401) when no token', async ({ request }) => {
    const res = await request.post('http://localhost:4000/api/users', { data: userFactory() });
    expect(res.status()).toBe(401);
  });
});
