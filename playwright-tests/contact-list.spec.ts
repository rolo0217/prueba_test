import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
import fetch from 'node-fetch';

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

test.describe.serial('Contact Manager', () => {
  test.beforeAll(async () => {
    await startServer();
  });

  test.beforeEach(async ({ page }) => {
    // Reset contacts and visit the application before each test
    await page.request.post('http://0.0.0.0:8000/api/contacts/reset');
    await page.goto('http://0.0.0.0:8000');
  });

  test('should add a new contact successfully', async ({ page }) => {
    // This test should verify the page loads correctly, add a new contact,
    // verify the success message, confirm the form is reset,
    // and check that the new contact appears in the list with an updated count.

    throw new Error('Not implemented');
  });

  test('should delete a contact successfully', async ({ page }) => {
    // Locate the delete button for a specific contact and click it.
    // Verify that a success message is displayed.
    // Verify that the contact is no longer present in the contacts list.

    throw new Error('Not implemented');
  });
});
