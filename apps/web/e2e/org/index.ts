import { test, expect } from '@playwright/test';

test('should navigate to org page', async ({ page }) => {
    const goToOrgBtn = await page.locator('create event');
    await goToOrgBtn.click();

    await expect(page).toHaveURL('/org');
});
