import { expect, APIRequestContext, APIResponse } from '@playwright/test';

export type ApiResponseBody = {
  responseCode: number;
  message?: string;
  products?: Array<Record<string, unknown>>;
  brands?: Array<Record<string, unknown>>;
  user?: Record<string, unknown>;
};

export async function parseApiResponse(response: APIResponse): Promise<ApiResponseBody> {
  const body = (await response.json()) as ApiResponseBody;
  expect(body).toHaveProperty('responseCode');
  return body;
}

export async function deleteAccountIfExists(
  request: APIRequestContext,
  email: string,
  password: string
): Promise<void> {
  const deleteResponse = await request.fetch('/api/deleteAccount', {
    method: 'DELETE',
    form: { email, password }
  });

  const body = await deleteResponse.json().catch(() => null);
  if (body?.responseCode === 200 || body?.responseCode === 404) {
    return;
  }
}
