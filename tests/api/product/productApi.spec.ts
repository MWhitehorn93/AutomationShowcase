import { test, expect } from '@playwright/test';
import {
  getAllProductsList,
  postProductsList,
  searchProducts,
  API_ENDPOINTS
} from '../../../apiSrc/apiClient';
import { parseApiResponse } from '../../../fixtures/apiFixtures';
import { API_RESPONSE_CODES, API_RESPONSE_MESSAGES } from '../../../apiSrc/apiRepsonse';

const SEARCH_PRODUCT = 'top';

  test('API 1: GET all products list', async ({ request }) => {
    const body = await getAllProductsList(request);

    expect(body.responseCode).toBe(API_RESPONSE_CODES.success);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products?.length).toBeGreaterThan(0);
  });

  test('API 2: POST to products list should be unsupported', async ({ request }) => {
    const body = await postProductsList(request);

    expect(body.responseCode).toBe(API_RESPONSE_CODES.methodNotAllowed);
    expect(body.message).toBe(API_RESPONSE_MESSAGES.methodNotSupported);
  });

  test('API 5: POST search product', async ({ request }) => {
    const body = await searchProducts(request, SEARCH_PRODUCT);

    expect(body.responseCode).toBe(API_RESPONSE_CODES.success);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products?.length).toBeGreaterThan(0);
  });

  test('API 6: POST search product without search_product should be bad request', async ({ request }) => {
    const response = await request.post(API_ENDPOINTS.searchProduct);
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(API_RESPONSE_CODES.badRequest);
    expect(body.message).toBe(API_RESPONSE_MESSAGES.searchProductMissing);
  });