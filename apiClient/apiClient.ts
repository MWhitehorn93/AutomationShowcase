import { APIRequestContext } from '@playwright/test';
import { parseApiResponse, ApiResponseBody } from '../fixtures/apiFixtures';

export const API_ENDPOINTS = {
  productsList: '/api/productsList',
  searchProduct: '/api/searchProduct',
  brandsList: '/api/brandsList',
  verifyLogin: '/api/verifyLogin',
  createAccount: '/api/createAccount',
  getUserDetailByEmail: '/api/getUserDetailByEmail',
  updateAccount: '/api/updateAccount',
  deleteAccount: '/api/deleteAccount'
} as const;

export async function getAllProductsList(request: APIRequestContext): Promise<ApiResponseBody> {
  const response = await request.get(API_ENDPOINTS.productsList);
  return parseApiResponse(response);
}

export async function postProductsList(request: APIRequestContext): Promise<ApiResponseBody> {
  const response = await request.post(API_ENDPOINTS.productsList);
  return parseApiResponse(response);
}

export async function searchProducts(
  request: APIRequestContext,
  searchProduct: string
): Promise<ApiResponseBody> {
  const response = await request.post(API_ENDPOINTS.searchProduct, {
    form: { search_product: searchProduct }
  });

  return parseApiResponse(response);
}
