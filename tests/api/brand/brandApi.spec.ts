import { test, expect } from '@playwright/test';
import testData from '../../../data/testData.json';
import { getAllBrandsList, putBrandsList } from '../../../apiSrc/apiClient';
import {
  API_RESPONSE_CODES,
  API_RESPONSE_MESSAGES
} from '../../../apiSrc/apiRepsonse';

  test('API 3: GET all brands list', async ({ request }) => {
      const body = await getAllBrandsList(request);

      expect(body.responseCode).toBe(API_RESPONSE_CODES.success);
      expect(body.brands).toEqual(testData.apiData.brandsList);
    });

    test('API 4: PUT to brands list should be unsupported', async ({ request }) => {
        const body = await putBrandsList(request);
        
        expect(body.responseCode).toBe(API_RESPONSE_CODES.methodNotAllowed);
        expect(body.message).toBe(API_RESPONSE_MESSAGES.methodNotSupported);
      });
    
