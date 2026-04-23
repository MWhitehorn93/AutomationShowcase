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

export async function verifyLogin(
  request: APIRequestContext,
  credentials: { email: string; password: string }
): Promise<ApiResponseBody> {
  const response = await request.post(API_ENDPOINTS.verifyLogin, {
    form: credentials
  });

  return parseApiResponse(response);
}

export async function verifyLoginWithoutEmail(
  request: APIRequestContext,
  password: string
): Promise<ApiResponseBody> {
  const response = await request.post(API_ENDPOINTS.verifyLogin, {
    form: { password }
  });

  return parseApiResponse(response);
}

export async function deleteVerifyLogin(request: APIRequestContext): Promise<ApiResponseBody> {
  const response = await request.fetch(API_ENDPOINTS.verifyLogin, {
    method: 'DELETE'
  });

  return parseApiResponse(response);
}
