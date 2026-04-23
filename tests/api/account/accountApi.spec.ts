import { test, expect } from '@playwright/test';
import testData from '../../../data/testData.json';
import { deleteAccountIfExists, parseApiResponse } from '../../../fixtures/apiFixtures';
import { API_ENDPOINTS } from '../../../apiClient/apiClient';

test.describe.serial('AutomationExercise API List Scenarios', () => {
  let lifecycleEmail = '';
  let lifecyclePassword = '';
  let lifecyclePayload: Record<string, string> = {};

  test('API 11: POST create/register user account', async ({ request }) => {
    lifecycleEmail = `apitest_${Date.now()}_${Math.random().toString(36).slice(2, 7)}@example.com`;
    lifecyclePassword = 'P@ssword123';

    lifecyclePayload = {
      name: 'API Test User',
      email: lifecycleEmail,
      password: lifecyclePassword,
      title: 'Mr',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1993',
      firstname: 'API',
      lastname: 'Tester',
      company: 'Automation Showcase',
      address1: '123 Main Street',
      address2: 'Apt 4B',
      country: 'Canada',
      zipcode: 'M4B1B3',
      state: 'Ontario',
      city: 'Toronto',
      mobile_number: '5551234567'
    };

    await deleteAccountIfExists(request, lifecycleEmail, lifecyclePassword);

    const createResponse = await request.post(API_ENDPOINTS.createAccount, {
      form: lifecyclePayload
    });
    const createBody = await parseApiResponse(createResponse);

    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!');
  });

  test('API 14: GET user account detail by email', async ({ request }) => {
    expect(lifecycleEmail).toBeTruthy();

    const getDetailResponse = await request.get(API_ENDPOINTS.getUserDetailByEmail, {
      params: { email: lifecycleEmail }
    });
    const getDetailBody = await parseApiResponse(getDetailResponse);

    expect(getDetailBody.responseCode).toBe(200);
    expect(getDetailBody.user).toBeTruthy();
    expect(getDetailBody.user?.email).toBe(lifecycleEmail);
  });

  test('API 13: PUT update user account', async ({ request }) => {
    expect(lifecycleEmail).toBeTruthy();

    const updatedPayload = {
      ...lifecyclePayload,
      name: 'API Test User Updated',
      city: 'Ottawa'
    };

    const updateResponse = await request.fetch(API_ENDPOINTS.updateAccount, {
      method: 'PUT',
      form: updatedPayload
    });
    const updateBody = await parseApiResponse(updateResponse);

    expect(updateBody.responseCode).toBe(200);
    expect(updateBody.message).toBe('User updated!');
  });

  test('API 12: DELETE user account', async ({ request }) => {
    expect(lifecycleEmail).toBeTruthy();

    const deleteResponse = await request.fetch(API_ENDPOINTS.deleteAccount, {
      method: 'DELETE',
      form: {
        email: lifecycleEmail,
        password: lifecyclePassword
      }
    });
    const deleteBody = await parseApiResponse(deleteResponse);

    expect(deleteBody.responseCode).toBe(200);
    expect(deleteBody.message).toBe('Account deleted!');
  });
});
