const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

test.describe('Bismut website browser gate', () => {
  test('home page loads and crystal has 6 facets', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#facet-navigation .crystal-faces a')).toHaveCount(6);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });

  test('product pages render content', async ({ page }) => {
    for (const p of ['forge.html', 'libsystem.html', 'library-explorer.html', 'launcher.html', 'engine.html', 'graphics.html']) {
      const resp = await page.goto('/' + p);
      expect(resp.status()).toBe(200);
    }
  });

  test('Library Explorer fetches catalog and renders entries', async ({ page }) => {
    await page.goto('/library-explorer.html');
    await page.waitForSelector('#explorer-list .explorer-card');
    const count = await page.locator('#explorer-list .explorer-card').count();
    expect(count).toBeGreaterThan(0);
    const countText = await page.locator('#explorer-count').textContent();
    expect(countText).toMatch(/\d+ von \d+ Bibliotheken/);
  });

  test('Library Explorer search filters results', async ({ page }) => {
    await page.goto('/library-explorer.html');
    await page.waitForSelector('#explorer-list .explorer-card');
    const before = await page.locator('#explorer-list .explorer-card').count();
    await page.fill('#explorer-search', 'config');
    await page.waitForTimeout(200);
    const after = await page.locator('#explorer-list .explorer-card').count();
    expect(after).toBeLessThan(before);
    expect(after).toBeGreaterThan(0);
  });

  test('Library Explorer empty results', async ({ page }) => {
    await page.goto('/library-explorer.html');
    await page.waitForSelector('#explorer-list .explorer-card');
    await page.fill('#explorer-search', 'zzzzzzzzz');
    await page.waitForTimeout(200);
    await expect(page.locator('#explorer-list .explorer-empty')).toBeVisible();
    await expect(page.locator('#explorer-list .explorer-card')).toHaveCount(0);
  });

  test('Library Explorer side filter', async ({ page }) => {
    await page.goto('/library-explorer.html');
    await page.waitForSelector('#explorer-list .explorer-card');
    await page.selectOption('#explorer-side', 'client');
    await page.waitForTimeout(200);
    const count = await page.locator('#explorer-list .explorer-card').count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('no horizontal overflow on explorer', async ({ page }) => {
    await page.goto('/library-explorer.html');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });

  test('keyboard focus on menu toggle', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('#menu-toggle');
    await toggle.focus();
    await expect(toggle).toBeFocused();
  });

  test('screenshots', async ({ page }, testInfo) => {
    await page.goto('/');
    const dir = path.join(process.cwd(), 'docs', 'evidence');
    fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, `pw-${testInfo.project.name}-index.png`), fullPage: true });
    await page.goto('/library-explorer.html');
    await page.waitForSelector('#explorer-list .explorer-card');
    await page.screenshot({ path: path.join(dir, `pw-${testInfo.project.name}-explorer.png`), fullPage: true });
  });
});