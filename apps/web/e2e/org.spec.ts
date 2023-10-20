import { test, expect } from '@playwright/test';

test.describe('organisation test', () => {
    test('should navigate to org page', async ({ page }) => {
        await page.locator('Create Events').click();

        await expect(page).toHaveURL('/org');
    });
});
