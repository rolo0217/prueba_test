# Project Files Instructions

## Overview
This is a Contact Manager challenge project. The business logic, styling, and server behavior are already implemented and **must not be modified**.

## What you need to implement
Complete the Playwright tests in `test/playwright-validation.test.ts`:

### Test 1: `should add a new contact successfully`
- Verify the page loads correctly
- Fill in the Name and Phone fields and submit the form
- Verify the success message appears
- Confirm the form is reset after submission
- Check that the new contact appears in the list
- Verify the contact count is updated

### Test 2: `should delete a contact successfully`
- Locate the delete button for a specific contact
- Click the delete button
- Verify the success message is displayed
- Verify the contact is no longer present in the contacts list

## Rules
- Do NOT modify `src/` files
- Do NOT modify `playwright.config.ts`
- Only implement the test bodies in `test/playwright-validation.test.ts`
- The server runs on `http://0.0.0.0:8000`
