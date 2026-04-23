import { test, expect } from '@playwright/test';
import testData from '../../../data/testData.json';
import { parseApiResponse } from '../../../fixtures/apiFixtures';
import { API_ENDPOINTS } from '../../../apiSrc/apiClient';
import { API_RESPONSE_CODES, API_RESPONSE_MESSAGES } from '../../../apiSrc/apiRepsonse';

    test('API 7: POST verify login with valid details', async ({ request }) => {
        const response = await request.post(API_ENDPOINTS.verifyLogin, {
        form: {
            email: testData.loginUser.email,
            password: testData.loginUser.password
        }
        });
        const body = await parseApiResponse(response);

        expect(body.responseCode).toBe(API_RESPONSE_CODES.success);
        expect(body.message).toBe(API_RESPONSE_MESSAGES.userExists);
    });

    test('API 8: POST verify login without email should be bad request', async ({ request }) => {
        const response = await request.post(API_ENDPOINTS.verifyLogin, {
        form: { password: testData.loginUser.password }
        });
        const body = await parseApiResponse(response);

        expect(body.responseCode).toBe(API_RESPONSE_CODES.badRequest);
        expect(body.message).toBe(API_RESPONSE_MESSAGES.emailOrPasswordMissing);
    });

    test('API 9: DELETE verify login should be unsupported', async ({ request }) => {
        const response = await request.fetch(API_ENDPOINTS.verifyLogin, {
        method: 'DELETE'
        });
        const body = await parseApiResponse(response);

        expect(body.responseCode).toBe(API_RESPONSE_CODES.methodNotAllowed);
        expect(body.message).toBe(API_RESPONSE_MESSAGES.methodNotSupported);
    });

    test('API 10: POST verify login with invalid details', async ({ request }) => {
        const response = await request.post(API_ENDPOINTS.verifyLogin, {
        form: {
            email: `missing_${Date.now()}@example.com`,
            password: 'invalidPassword'
        }
        });
        const body = await parseApiResponse(response);

        expect(body.responseCode).toBe(API_RESPONSE_CODES.notFound);
        expect(body.message).toBe(API_RESPONSE_MESSAGES.userNotFound);
    });
