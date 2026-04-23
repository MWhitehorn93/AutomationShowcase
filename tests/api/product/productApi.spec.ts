import { test, expect } from '@playwright/test';
import testData from '../../../data/testData.json';
import {
  getAllProductsList,
  postProductsList,
  searchProducts,
  API_ENDPOINTS
} from '../../../apiSrc/apiClient';
import { parseApiResponse } from '../../../fixtures/apiFixtures';
import { API_RESPONSE_CODES, API_RESPONSE_MESSAGES } from '../../../apiSrc/apiRepsonse';

const SEARCH_PRODUCT = testData.singleProduct.productName;
const EXPECTED_SEARCH_RESULTS = testData.apiResponses.productsList.filter(
  product => product.name === SEARCH_PRODUCT
);

  test('API 1: GET all products list', async ({ request }) => {
    const body = await getAllProductsList(request);

    expect(body.responseCode).toBe(API_RESPONSE_CODES.success);
    expect(body.products).toEqual(testData.apiResponses.productsList);
  });

  test('API 2: POST to products list should be unsupported', async ({ request }) => {
    const body = await postProductsList(request);

    expect(body.responseCode).toBe(API_RESPONSE_CODES.methodNotAllowed);
    expect(body.message).toBe(API_RESPONSE_MESSAGES.methodNotSupported);
  });

  test('API 5: POST search product', async ({ request }) => {
    const body = await searchProducts(request, SEARCH_PRODUCT);

    expect(body.responseCode).toBe(API_RESPONSE_CODES.success);
    expect(body.products).toEqual(EXPECTED_SEARCH_RESULTS);
  });

  test('API 6: POST search product without search_product should be bad request', async ({ request }) => {
    const response = await request.post(API_ENDPOINTS.searchProduct);
    const body = await parseApiResponse(response);

    expect(body.responseCode).toBe(API_RESPONSE_CODES.badRequest);
    expect(body.message).toBe(API_RESPONSE_MESSAGES.searchProductMissing);
  });