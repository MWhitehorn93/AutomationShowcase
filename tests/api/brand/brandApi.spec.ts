import { test, expect } from '@playwright/test';
import testData from '../../../data/testData.json';
import { parseApiResponse } from '../../../fixtures/apiFixtures';
import { API_ENDPOINTS } from '../../../apiSrc/apiClient';
import {
  API_RESPONSE_CODES,
  API_RESPONSE_MESSAGES
} from '../../../apiSrc/apiRepsonse';

  test('API 3: GET all brands list', async ({ request }) => {
      const response = await request.get(API_ENDPOINTS.brandsList);
      const body = await parseApiResponse(response);

      expect(body.responseCode).toBe(API_RESPONSE_CODES.success);
      expect(body.brands).toEqual(testData.apiResponses.brandsList);
    });

    test('API 4: PUT to brands list should be unsupported', async ({ request }) => {
        const response = await request.put(API_ENDPOINTS.brandsList);
        const body = await parseApiResponse(response);
        
        expect(body.responseCode).toBe(API_RESPONSE_CODES.methodNotAllowed);
        expect(body.message).toBe(API_RESPONSE_MESSAGES.methodNotSupported);
      });
    
