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

// User info (use this information only)
// firstName: 'John'
// lastName: 'Doe'
// email: 'john.doe@example.com'
// phone: '1234567890'
// dateOfBirth: 25 years ago from today
// street: '123 Main St'
// city: 'New York'
// state: 'NY'
// zipCode: '10001'
// country: 'United States'

test.describe('Multi-Step Registration Form', () => {
  test.beforeAll(async () => {
    await startServer();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/registration.html');
  });

  test('should proceed to step 2 when all fields are valid', async ({ page }) => {
    // Fill personal details (firstName, lastName, email, phone, dateOfBirth)
    // Click "Next" button for step 1
    // Assert step 1 is hidden and step 2 is visible

    throw new Error('Not implemented');
  });

  test('should proceed to step 3 when all fields are valid', async ({ page }) => {
    // Fill personal details (step 1) and navigate to step 2
    // Fill address details (street, city, state, zipCode, country)
    // Assert step 2 is hidden and step 3 is visible

    throw new Error('Not implemented');
  });

  test('should display all entered information for confirmation', async ({ page }) => {
    // Fill step 1 (personal) and step 2 (address), then navigate to step 3
    // Verify all entered data is shown correctly in the confirmation section:
    //   - Full name, email, phone, date of birth
    //   - Street address, city, state, zip code, country

    throw new Error('Not implemented');
  });
});
