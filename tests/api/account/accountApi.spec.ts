import { test, expect } from '@playwright/test';
import testData from '../../../data/testData.json';
import { deleteAccountIfExists } from '../../../fixtures/apiFixtures';
import { createAccount, getUserDetailByEmail, updateAccount, deleteAccount } from '../../../apiSrc/apiClient';
import { API_RESPONSE_CODES, API_RESPONSE_MESSAGES } from '../../../apiSrc/apiRepsonse';

const ACCOUNT_API_DATA = testData.accountApi;

test.describe.serial('AutomationExercise API List Scenarios', () => {
  let lifecycleEmail = '';
  let lifecyclePassword = '';
  let lifecyclePayload: Record<string, string> = {};

  test('API 11: POST create/register user account', async ({ request }) => {
    lifecycleEmail = `${ACCOUNT_API_DATA.emailPrefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}@example.com`;
    lifecyclePassword = ACCOUNT_API_DATA.registration.password;

    lifecyclePayload = {
      ...ACCOUNT_API_DATA.registration,
      email: lifecycleEmail,
      password: lifecyclePassword
    };

    await deleteAccountIfExists(request, lifecycleEmail, lifecyclePassword);

    const createBody = await createAccount(request, lifecyclePayload);

    expect(createBody.responseCode).toBe(API_RESPONSE_CODES.created);
    expect(createBody.message).toBe(API_RESPONSE_MESSAGES.userCreated);
  });

  test('API 14: GET user account detail by email', async ({ request }) => {
    expect(lifecycleEmail).toBeTruthy();

    const getDetailBody = await getUserDetailByEmail(request, lifecycleEmail);

    expect(getDetailBody.responseCode).toBe(API_RESPONSE_CODES.success);
    expect(getDetailBody.user).toBeTruthy();
    expect(getDetailBody.user?.email).toBe(lifecycleEmail);
  });

  test('API 13: PUT update user account', async ({ request }) => {
    expect(lifecycleEmail).toBeTruthy();

    const updatedPayload = {
      ...lifecyclePayload,
      ...ACCOUNT_API_DATA.update
    };

    const updateBody = await updateAccount(request, updatedPayload);

    expect(updateBody.responseCode).toBe(API_RESPONSE_CODES.success);
    expect(updateBody.message).toBe(API_RESPONSE_MESSAGES.userUpdated);
  });

  test('API 12: DELETE user account', async ({ request }) => {
    expect(lifecycleEmail).toBeTruthy();

    const deleteBody = await deleteAccount(request, lifecycleEmail, lifecyclePassword);

    expect(deleteBody.responseCode).toBe(API_RESPONSE_CODES.success);
    expect(deleteBody.message).toBe(API_RESPONSE_MESSAGES.accountDeleted);
  });
});
