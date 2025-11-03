export function userFactory(overrides = {}) {
  const n = Math.floor(Math.random() * 100000);
  return {
    name: overrides.name ?? `User ${n}`,
    email: overrides.email ?? `user${n}@example.com`,
    accountType: overrides.accountType ?? 'premium'
  };
}

export function txFactory(overrides = {}) {
  return {
    userId: overrides.userId ?? 'u-1',
    amount: overrides.amount ?? 100.5,
    type: overrides.type ?? 'transfer',
    recipientId: overrides.recipientId ?? '456'
  };
}
