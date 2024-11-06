import test, { expect } from '@playwright/test';
import axios from 'axios';

test('check api', async () => {
  const request = axios.get(
    'https://service.banki.ru/api/v1/auto/powers?modelId=1003108&year=2024',
    {
      withCredentials: true,
    }
  );

  const response = (await request).data;
  expect(response.result.status).toBe('success');
});
