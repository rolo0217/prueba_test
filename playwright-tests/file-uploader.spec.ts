import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
import fetch from 'node-fetch';
import path from 'path';

// Helper function to start server automatically before tests
function startServer() {
  return new Promise<void>((resolve, reject) => {
    const server = spawn('npx', ['ts-node', 'src/server.ts'], { stdio: 'pipe', detached: false });

    let serverReady = false;
    let checkAttempts = 0;
    const maxAttempts = 30; // 30 seconds total

    const checkServer = async () => {
      if (serverReady) return;

      try {
        const response = await fetch('http://0.0.0.0:8000/api/contacts');
        if (response.ok) {
          serverReady = true;
          resolve(server);
          return;
        }
      } catch (error) {
        // Server not ready yet
      }

      checkAttempts++;
      if (checkAttempts >= maxAttempts) {
        reject(new Error('Server failed to start within 30 seconds'));
        return;
      }

      setTimeout(checkServer, 1000);
    };

    setTimeout(checkServer, 1000);
  });
}

test.describe('File Upload & Reader Application', () => {
  test.beforeAll(async () => {
    await startServer();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/fileupload.html');
  });

  test('should upload the file', async ({ page }) => {
    // Select the sample file for upload using the file input
    // triggerFile: String;
    // PublishFile: String;
    // filepath: String;

    // await page.click(triggerFile);
    // await page.setInputFiles(PublishFile);

    // Verify file info is shown in the UI (filename and size)

    throw new Error('Not implemented');
  });

  test('should display the file content', async ({ page }) => {
    // Upload the actual sample file
    // Verify file content is displayed correctly

    throw new Error('Not implemented');
  });

  test('should publish the file', async ({ page }) => {
    // Upload the actual sample file
    // Click the publish button
    // Verify success message is shown after publishing

    throw new Error('Not implemented');
  });
});
