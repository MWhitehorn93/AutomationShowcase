import { test, expect } from '@playwright/test';
import {
  getAllProductsList,
  postProductsList,
  searchProducts,
  API_ENDPOINTS
} from '../../../apiClient/apiClient';
import { parseApiResponse } from '../../../fixtures/apiFixtures';

const RESPONSE_CODES = {
  success: 200,
  methodNotAllowed: 405
} as const;

const RESPONSE_MESSAGES = {
  methodNotSupported: 'This request method is not supported.'
} as const;

const SEARCH_PRODUCT = 'top';

  test('API 1: GET all products list', async ({ request }) => {
    const body = await getAllProductsList(request);

    expect(body.responseCode).toBe(RESPONSE_CODES.success);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products?.length).toBeGreaterThan(0);
  });

  test('API 2: POST to products list should be unsupported', async ({ request }) => {
    const body = await postProductsList(request);

    expect(body.responseCode).toBe(RESPONSE_CODES.methodNotAllowed);
    expect(body.message).toBe(RESPONSE_MESSAGES.methodNotSupported);
  });

  test('API 5: POST search product', async ({ request }) => {
    const body = await searchProducts(request, SEARCH_PRODUCT);

    expect(body.responseCode).toBe(RESPONSE_CODES.success);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products?.length).toBeGreaterThan(0);
  });

  test('API 6: POST search product without search_product should be bad request', async ({ request }) => {
    const response = await request.post(API_ENDPOINTS.searchProduct);
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
  });