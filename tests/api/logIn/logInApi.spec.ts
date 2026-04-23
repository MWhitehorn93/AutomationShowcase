import { test, expect } from '@playwright/test';
import testData from '../../../data/testData.json';
import {
  deleteVerifyLogin,
  verifyLogin,
  verifyLoginWithoutEmail
} from '../../../apiSrc/apiClient';
import { API_RESPONSE_CODES, API_RESPONSE_MESSAGES } from '../../../apiSrc/apiRepsonse';

    test('API 7: POST verify login with valid details', async ({ request }) => {
        const body = await verifyLogin(request, {
            email: testData.loginUser.email,
            password: testData.loginUser.password
        });

        expect(body.responseCode).toBe(API_RESPONSE_CODES.success);
        expect(body.message).toBe(API_RESPONSE_MESSAGES.userExists);
    });

    test('API 8: POST verify login without email should be bad request', async ({ request }) => {
        const body = await verifyLoginWithoutEmail(request, testData.loginUser.password);

        expect(body.responseCode).toBe(API_RESPONSE_CODES.badRequest);
        expect(body.message).toBe(API_RESPONSE_MESSAGES.emailOrPasswordMissing);
    });

    test('API 9: DELETE verify login should be unsupported', async ({ request }) => {
        const body = await deleteVerifyLogin(request);

        expect(body.responseCode).toBe(API_RESPONSE_CODES.methodNotAllowed);
        expect(body.message).toBe(API_RESPONSE_MESSAGES.methodNotSupported);
    });

    test('API 10: POST verify login with invalid details', async ({ request }) => {
        const body = await verifyLogin(request, {
            email: testData.incorrectUser.email,
            password: testData.incorrectUser.password
        });

        expect(body.responseCode).toBe(API_RESPONSE_CODES.notFound);
        expect(body.message).toBe(API_RESPONSE_MESSAGES.userNotFound);
    });
