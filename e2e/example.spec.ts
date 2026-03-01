import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('https://beervanu.github.io/Scrapbook/?day=1');
});
