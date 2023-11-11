import { test, expect } from '@playwright/test';

test.describe('events test', () => {
    test('should navigate to the events page', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto('/');
        // Find an element with the text 'events' and click on it
        await page.locator('h4').getByText('Events').click();
        // The new url should be "/events" (baseURL is used there)
        await expect(page).toHaveURL('/events');
        // The new page should contain an h1 with "About Page"
        await expect(page.getByRole('heading', { level: 1 })).toContainText('Find Events');
    });
});
