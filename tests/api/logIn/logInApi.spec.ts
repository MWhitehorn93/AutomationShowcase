import { test, expect } from '@playwright/test';
import testData from '../../../data/testData.json';
import { parseApiResponse } from '../../../fixtures/apiFixtures';
import { API_ENDPOINTS } from '../../../apiClient/apiClient';

    test('API 7: POST verify login with valid details', async ({ request }) => {
        const response = await request.post(API_ENDPOINTS.verifyLogin, {
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
        const response = await request.post(API_ENDPOINTS.verifyLogin, {
        form: { password: testData.loginUser.password }
        });
        const body = await parseApiResponse(response);

        expect(body.responseCode).toBe(400);
        expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });

    test('API 9: DELETE verify login should be unsupported', async ({ request }) => {
        const response = await request.fetch(API_ENDPOINTS.verifyLogin, {
        method: 'DELETE'
        });
        const body = await parseApiResponse(response);

        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

    test('API 10: POST verify login with invalid details', async ({ request }) => {
        const response = await request.post(API_ENDPOINTS.verifyLogin, {
        form: {
            email: `missing_${Date.now()}@example.com`,
            password: 'invalidPassword'
        }
        });
        const body = await parseApiResponse(response);

        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('User not found!');
    });
