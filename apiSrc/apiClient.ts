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

export async function getAllBrandsList(request: APIRequestContext): Promise<ApiResponseBody> {
  const response = await request.get(API_ENDPOINTS.brandsList);
  return parseApiResponse(response);
}

export async function putBrandsList(request: APIRequestContext): Promise<ApiResponseBody> {
  const response = await request.put(API_ENDPOINTS.brandsList);
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

export async function createAccount(
  request: APIRequestContext,
  payload: Record<string, string>
): Promise<ApiResponseBody> {
  const response = await request.post(API_ENDPOINTS.createAccount, {
    form: payload
  });

  return parseApiResponse(response);
}

export async function getUserDetailByEmail(
  request: APIRequestContext,
  email: string
): Promise<ApiResponseBody> {
  const response = await request.get(API_ENDPOINTS.getUserDetailByEmail, {
    params: { email }
  });

  return parseApiResponse(response);
}

export async function updateAccount(
  request: APIRequestContext,
  payload: Record<string, string>
): Promise<ApiResponseBody> {
  const response = await request.fetch(API_ENDPOINTS.updateAccount, {
    method: 'PUT',
    form: payload
  });

  return parseApiResponse(response);
}

export async function deleteAccount(
  request: APIRequestContext,
  email: string,
  password: string
): Promise<ApiResponseBody> {
  const response = await request.fetch(API_ENDPOINTS.deleteAccount, {
    method: 'DELETE',
    form: { email, password }
  });

  return parseApiResponse(response);
}
