export const env = {
  envName: process.env.TEST_ENV || 'dev',
  api: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:4000',
    authToken: process.env.API_TOKEN || 'test-token'
  }
};
