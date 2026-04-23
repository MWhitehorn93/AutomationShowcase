import { test, expect } from '@playwright/test';
import testData from '../../data/testData.json';
import { deleteAccountIfExists, parseApiResponse } from '../../fixtures/apiFixtures';

test.describe.serial('AutomationExercise API List Scenarios', () => {
  let lifecycleEmail = '';
  let lifecyclePassword = '';
  let lifecyclePayload: Record<string, string> = {};

  test('API 1: GET all products list', async ({ request }) => {
    const response = await request.get('/api/productsList');
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products?.length).toBeGreaterThan(0);
  });

  test('API 2: POST to products list should be unsupported', async ({ request }) => {
    const response = await request.post('/api/productsList');
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
  });

  test('API 3: GET all brands list', async ({ request }) => {
    const response = await request.get('/api/brandsList');
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBeTruthy();
    expect(body.brands?.length).toBeGreaterThan(0);
  });

  test('API 4: PUT to brands list should be unsupported', async ({ request }) => {
    const response = await request.put('/api/brandsList');
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
  });

  test('API 5: POST search product', async ({ request }) => {
    const response = await request.post('/api/searchProduct', {
      form: { search_product: 'top' }
    });
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products?.length).toBeGreaterThan(0);
  });

  test('API 6: POST search product without search_product should be bad request', async ({ request }) => {
    const response = await request.post('/api/searchProduct');
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
  });

  test('API 7: POST verify login with valid details', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
      form: {
        email: testData.loginUser.email,
        password: testData.loginUser.password
      }
    });
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  test('API 8: POST verify login without email should be bad request', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
      form: { password: testData.loginUser.password }
    });
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
  });

  test('API 9: DELETE verify login should be unsupported', async ({ request }) => {
    const response = await request.fetch('/api/verifyLogin', {
      method: 'DELETE'
    });
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
  });

  test('API 10: POST verify login with invalid details', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
      form: {
        email: `missing_${Date.now()}@example.com`,
        password: 'invalidPassword'
      }
    });
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

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

    const createResponse = await request.post('/api/createAccount', {
      form: lifecyclePayload
    });
    const createBody = await parseApiResponse(createResponse);

    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!');
  });

  test('API 14: GET user account detail by email', async ({ request }) => {
    expect(lifecycleEmail).toBeTruthy();

    const getDetailResponse = await request.get('/api/getUserDetailByEmail', {
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

    const updateResponse = await request.fetch('/api/updateAccount', {
      method: 'PUT',
      form: updatedPayload
    });
    const updateBody = await parseApiResponse(updateResponse);

    expect(updateBody.responseCode).toBe(200);
    expect(updateBody.message).toBe('User updated!');
  });

  test('API 12: DELETE user account', async ({ request }) => {
    expect(lifecycleEmail).toBeTruthy();

    const deleteResponse = await request.fetch('/api/deleteAccount', {
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
