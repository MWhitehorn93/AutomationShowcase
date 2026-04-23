import { test, expect } from '@playwright/test';
import { deleteAccountIfExists, parseApiResponse } from '../../../fixtures/apiFixtures';
import { API_ENDPOINTS } from '../../../apiClient/apiClient';

test.describe.serial('AutomationExercise API List Scenarios', () => {
  let lifecycleEmail = '';
  let lifecyclePassword = '';
  let lifecyclePayload: Record<string, string> = {};


  test('API 3: GET all brands list', async ({ request }) => {
      const response = await request.get(API_ENDPOINTS.brandsList);
      const body = await parseApiResponse(response);
  
      expect(body.responseCode).toBe(200);
      expect(Array.isArray(body.brands)).toBeTruthy();
      expect(body.brands?.length).toBeGreaterThan(0);
    });

    test('API 4: PUT to brands list should be unsupported', async ({ request }) => {
        const response = await request.put(API_ENDPOINTS.brandsList);
        const body = await parseApiResponse(response);
    
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
      });
    
});