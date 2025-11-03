import { request } from '@playwright/test';

// Returns a Playwright APIRequestContext pre-wired for our API
export async function apiContext() {
  return await request.newContext({
    baseURL: 'http://localhost:4000',
    extraHTTPHeaders: { Authorization: 'Bearer test-token' }
  });
}

// Small helpers for convenience in tests (optional)
export async function postJson(api, url, data) {
  const res = await api.post(url, { data });
  return { status: res.status(), json: await res.json() };
}

export async function getJson(api, url) {
  const res = await api.get(url);
  return { status: res.status(), json: await res.json() };
}
