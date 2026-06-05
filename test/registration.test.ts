import { test, expect } from '@playwright/test';

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
  test.beforeEach(async ({ page }) => {
    await page.goto('/registration.html');
  });

  test('should proceed to step 2 when all fields are valid', async ({ page }) => {
    // Fill personal details (firstName, lastName, email, phone, dateOfBirth)
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#phone', '1234567890');

    // Calculate date 25 years ago
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);
    const dobStr = dob.toISOString().split('T')[0];
    await page.fill('#dateOfBirth', dobStr);

    // Click "Next" button for step 1
    await page.click('#next-1');

    // Assert step 1 is hidden and step 2 is visible
    await expect(page.locator('#step-1')).toHaveClass(/hidden/);
    await expect(page.locator('#step-2')).not.toHaveClass(/hidden/);
    await expect(page.locator('#progress-2')).toHaveClass(/active/);
  });

  test('should proceed to step 3 when all fields are valid', async ({ page }) => {
    // Fill personal details (step 1) and navigate to step 2
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#phone', '1234567890');
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);
    await page.fill('#dateOfBirth', dob.toISOString().split('T')[0]);
    await page.click('#next-1');

    // Fill address details
    await page.fill('#street', '123 Main St');
    await page.fill('#city', 'New York');
    await page.fill('#state', 'NY');
    await page.fill('#zipCode', '10001');
    await page.fill('#country', 'United States');
    await page.click('#next-2');

    // Assert step 2 is hidden and step 3 is visible
    await expect(page.locator('#step-2')).toHaveClass(/hidden/);
    await expect(page.locator('#step-3')).not.toHaveClass(/hidden/);
    await expect(page.locator('#progress-3')).toHaveClass(/active/);
  });

  test('should display all entered information for confirmation', async ({ page }) => {
    // Fill step 1 (personal) and step 2 (address), then navigate to step 3
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#phone', '1234567890');
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);
    const dobStr = dob.toISOString().split('T')[0];
    await page.fill('#dateOfBirth', dobStr);
    await page.click('#next-1');

    await page.fill('#street', '123 Main St');
    await page.fill('#city', 'New York');
    await page.fill('#state', 'NY');
    await page.fill('#zipCode', '10001');
    await page.fill('#country', 'United States');
    await page.click('#next-2');

    // Verify confirmation data is shown correctly
    await expect(page.locator('#confirm-name')).toContainText('John Doe');
    await expect(page.locator('#confirm-email')).toContainText('john.doe@example.com');
    await expect(page.locator('#confirm-phone')).toContainText('1234567890');
    await expect(page.locator('#confirm-dob')).toContainText(dobStr);
    await expect(page.locator('#confirm-address')).toContainText('123 Main St');
    await expect(page.locator('#confirm-country')).toContainText('United States');
  });
});
