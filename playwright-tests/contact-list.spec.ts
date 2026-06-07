import { test, expect } from '@playwright/test';

test.describe.serial('Contact Manager', () => {
  test.beforeEach(async ({ page }) => {
    // Visit the application before each test
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
