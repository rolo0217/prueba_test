import { test, expect } from '@playwright/test';

test.describe.serial('Contact Manager', () => {
  test.beforeEach(async ({ page }) => {
    await page.request.post('http://localhost:8000/api/contacts/reset');
    await page.goto('http://localhost:8000');
  });

  test('should add a new contact successfully', async ({ page }) => {
    // Verify page loads correctly
    await expect(page).toHaveTitle('Contact Manager');
    await expect(page.locator('h2').first()).toContainText('Add New Contact');

    // Get current contact count before adding
    const countText = await page.locator('#contact-count').textContent();
    const initialCount = parseInt(countText || '0');

    // Fill and submit the form
    await page.fill('#name', 'John Doe');
    await page.fill('#phone', '5551234567');
    await page.click('button[type="submit"]');

    // Verify success message appears
    const successMsg = page.locator('#success-message');
    await expect(successMsg).toBeVisible();
    await expect(successMsg).toContainText('Contact added successfully');

    // Confirm the form is reset
    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#phone')).toHaveValue('');

    // Check the new contact appears in the list
    await expect(page.locator('#contacts-list')).toContainText('John Doe');
    await expect(page.locator('#contacts-list')).toContainText('5551234567');

    // Verify contact count is updated
    const newCount = await page.locator('#contact-count').textContent();
    expect(parseInt(newCount || '0')).toBe(initialCount + 1);
  });

  test('should delete a contact successfully', async ({ page }) => {
    // Ensure there is at least one contact (Demo) in the list
    await expect(page.locator('#contacts-list')).toContainText('Demo');

    // Get the name of the first contact to verify deletion
    const firstName = await page.locator('.contact-name').first().textContent();

    // Get count before deletion
    const countBefore = await page.locator('#contact-count').textContent();
    const initialCount = parseInt(countBefore || '0');

    // Locate and click the delete button for the first contact
    await page.locator('.delete-btn').first().click();

    // Verify success message is displayed
    const successMsg = page.locator('#success-message');
    await expect(successMsg).toBeVisible();
    await expect(successMsg).toContainText('Contact deleted successfully');

    // Verify the contact is no longer present in the list
    const cleanName = (firstName || '').replace(/^\S+\s*/, '').trim();
    await expect(page.locator('#contacts-list')).not.toContainText(cleanName);

    // Verify count decreased
    const countAfter = await page.locator('#contact-count').textContent();
    expect(parseInt(countAfter || '0')).toBe(initialCount - 1);
  });
});
