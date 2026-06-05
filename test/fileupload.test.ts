import { test, expect } from '@playwright/test';
import path from 'path';

const SAMPLE_FILE = path.join(__dirname, '../src/assets/tests/sample.txt');

test.describe('File Upload & Reader Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fileupload.html');
  });

  test('should upload the file', async ({ page }) => {
    // Select the sample file for upload using the file input
    const fileInput = page.locator('#file-input');
    await fileInput.setInputFiles(SAMPLE_FILE);

    // Verify file info is shown in the UI (filename and size)
    await expect(page.locator('#file-info')).not.toHaveClass(/hidden/);
    await expect(page.locator('#file-name')).toContainText('sample.txt');
    await expect(page.locator('#file-size')).not.toBeEmpty();
  });

  test('should display the file content', async ({ page }) => {
    // Upload the actual sample file
    await page.locator('#file-input').setInputFiles(SAMPLE_FILE);

    // Verify file content is displayed correctly
    await expect(page.locator('#content-section')).not.toHaveClass(/hidden/);
    await expect(page.locator('#file-content')).toContainText('sample file');
  });

  test('should publish the file', async ({ page }) => {
    // Upload the actual sample file
    await page.locator('#file-input').setInputFiles(SAMPLE_FILE);

    // Wait for content section to appear
    await expect(page.locator('#content-section')).not.toHaveClass(/hidden/);

    // Click publish
    await page.click('#publish-btn');

    // Verify success message is shown after publishing
    await expect(page.locator('#publish-success')).not.toHaveClass(/hidden/);
    await expect(page.locator('#publish-success')).toContainText('File published successfully');
  });
});
