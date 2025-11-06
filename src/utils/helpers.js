import { request } from '@playwright/test';
import { env } from '../config/env.js';

// Returns a Playwright APIRequestContext pre-wired for our API
export async function apiContext() {
  return await request.newContext({
    baseURL: env.api.baseURL,
    extraHTTPHeaders: { Authorization: `Bearer ${env.api.authToken}` }
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
