# Architecture & Documentation

## Overview

**Playwright Challenge App** is a multi-module web application built with Node.js, Express and TypeScript on the backend, and plain HTML/CSS/JavaScript on the frontend. It was designed as a Playwright testing challenge, where each module has a fully functional UI with automated end-to-end tests.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Server | Express 4 |
| Language (backend) | TypeScript (via `ts-node`) |
| Language (frontend) | HTML + CSS + Vanilla JS |
| Testing | Playwright Test |
| Port | `8000` |

---

## Project Structure

```
prueba/
├── src/
│   ├── server.ts               # Main Express server (TypeScript)
│   ├── routes/
│   │   ├── api.ts              # REST API for contacts
│   │   ├── home.html           # Home / landing page
│   │   ├── index.html          # Contact Manager UI
│   │   ├── app.js              # Contact Manager frontend logic
│   │   ├── app.css             # Contact Manager styles
│   │   ├── registration.html   # Multi-Step Registration Form UI
│   │   ├── registration.js     # Registration Form frontend logic
│   │   ├── registration.css    # Registration Form styles
│   │   ├── fileupload.html     # File Upload & Reader UI
│   │   ├── fileupload.js       # File Upload frontend logic
│   │   └── fileupload.css      # File Upload styles
│   └── assets/
│       └── tests/
│           └── sample.txt      # Sample file used in upload tests
├── test/
│   ├── playwright-validation.test.ts  # Contact Manager tests
│   ├── registration.test.ts           # Registration Form tests
│   └── fileupload.test.ts             # File Upload tests
├── playwright-tests/
│   └── playwright-spec.ts      # Helper with server auto-start logic
├── server.js                   # Standalone JS server (no TypeScript)
├── playwright.config.ts        # Playwright configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── config.json                 # Server host/port configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Scripts and dependencies
```

---

## Server (`src/server.ts`)

Entry point of the application. Starts an Express server on port `8000`.

### Responsibilities
- Serves all static frontend files from `src/routes/`
- Handles the root route `/` serving `home.html`
- Mounts the contacts REST API under `/api`

### Key configuration
```json
// config.json
{
  "server": { "host": "0.0.0.0", "port": 8000 },
  "app": { "name": "Contact Manager", "version": "1.0.0" }
}
```

---

## REST API (`src/routes/api.ts`)

In-memory contacts store. Data resets every time the server restarts.

### Data Model
```typescript
interface Contact {
  id: number;
  name: string;
  phone: string;
}
```

### Initial State
```json
[{ "id": 1, "name": "Demo", "phone": "1234567890" }]
```

### Endpoints

| Method | URL | Body | Response | Description |
|--------|-----|------|----------|-------------|
| `GET` | `/api/contacts` | — | `Contact[]` | Get all contacts |
| `POST` | `/api/contacts` | `{ name, phone }` | `Contact` (201) | Add new contact |
| `DELETE` | `/api/contacts/:id` | — | `{ message }` | Delete contact by ID |
| `POST` | `/api/contacts/reset` | — | `{ message }` | Reset to initial state (used by tests) |

### Error responses
- `400` — Missing `name` or `phone` on POST
- `404` — Contact not found on DELETE

---

## Modules

### 1. Home Page (`home.html`)
Landing page with navigation cards to all modules.

- URL: `http://localhost:8000/`
- Cards: Contact Manager, Registration Form, File Upload
- Each card has an **Open** button linking to its module

---

### 2. Contact Manager (`index.html` + `app.js`)

Manages a list of personal contacts via REST API.

**UI Elements**
| Element | ID | Description |
|---------|----|-------------|
| Name input | `#name` | Contact name field |
| Phone input | `#phone` | Contact phone field |
| Submit button | `button[type="submit"]` | Add contact |
| Success message | `#success-message` | Feedback shown for 3s |
| Contacts list | `#contacts-list` | Rendered list of contacts |
| Contact count | `#contact-count` | Live count of contacts |
| Delete button | `.delete-btn` | Per-contact delete |

**Frontend Functions (`app.js`)**

| Function | Description |
|----------|-------------|
| `loadContacts()` | Fetches all contacts from API and renders them |
| `renderContacts(contacts)` | Builds DOM list items for each contact |
| `deleteContact(id)` | Calls DELETE API, shows success, reloads list |
| `showSuccess(message)` | Shows success banner, hides after 3 seconds |
| Form `submit` listener | Reads inputs, calls POST API, resets form |

---

### 3. Multi-Step Registration Form (`registration.html` + `registration.js`)

3-step form that collects personal and address data, then shows a confirmation summary. All logic is client-side only (no API calls).

**Steps**
| Step | ID | Fields |
|------|----|--------|
| 1 - Personal Details | `#step-1` | firstName, lastName, email, phone, dateOfBirth |
| 2 - Address Details | `#step-2` | street, city, state, zipCode, country |
| 3 - Confirmation | `#step-3` | Summary of all entered data + Submit button |

**UI Elements**
| Element | ID | Description |
|---------|----|-------------|
| Progress buttons | `#progress-1/2/3` | Step indicator bar |
| Next (step 1) | `#next-1` | Validates and advances to step 2 |
| Next (step 2) | `#next-2` | Validates and advances to step 3 |
| Previous (step 2) | `#prev-2` | Goes back to step 1 |
| Previous (step 3) | `#prev-3` | Goes back to step 2 |
| Submit | `#submit-form` | Finalizes registration |
| Success message | `#submit-success` | Shown after submit |

**Frontend Functions (`registration.js`)**

| Function / Listener | Description |
|---------------------|-------------|
| `showStep(step)` | Shows the target step, hides others, updates progress bar |
| `#next-1` click | Validates step 1 fields, saves to `formData`, calls `showStep(2)` |
| `#next-2` click | Validates step 2 fields, populates confirmation spans, calls `showStep(3)` |
| `#submit-form` click | Shows success message, disables submit button |

**In-memory state**
```javascript
const formData = {};
// Populated progressively as user advances steps
// Keys: firstName, lastName, email, phone, dateOfBirth,
//       street, city, state, zipCode, country
```

---

### 4. File Upload & Reader (`fileupload.html` + `fileupload.js`)

Allows users to upload a text file via click or drag & drop, read its content in the browser, and publish it.

**UI Elements**
| Element | ID | Description |
|---------|----|-------------|
| Drop zone | `#drop-zone` | Drag & drop area |
| File input | `#file-input` | Hidden `<input type="file">` |
| File info | `#file-info` | Shows filename and size after upload |
| File name | `#file-name` | Displays the uploaded file name |
| File size | `#file-size` | Displays the formatted file size |
| Content section | `#content-section` | Container for file content |
| File content | `#file-content` | `<pre>` showing the raw text content |
| Publish button | `#publish-btn` | Publishes the file |
| Publish success | `#publish-success` | Confirmation message after publish |

**Frontend Functions (`fileupload.js`)**

| Function / Listener | Description |
|---------------------|-------------|
| `formatSize(bytes)` | Converts bytes to B / KB / MB string |
| `handleFile(file)` | Reads file with `FileReader`, populates UI |
| `#file-input` change | Triggers `handleFile` on file selection |
| `#drop-zone` dragover | Highlights drop zone border |
| `#drop-zone` dragleave | Restores drop zone border |
| `#drop-zone` drop | Extracts dropped file, calls `handleFile` |
| `#publish-btn` click | Shows success message, disables button |

---

## Tests (`test/`)

Playwright end-to-end tests. All run on `http://localhost:8000`.

**Configuration (`playwright.config.ts`)**
```typescript
{
  testDir: './test',
  workers: 1,
  timeout: 120000,        // 2 min per test
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8000',
    launchOptions: { slowMo: 500 }  // Visual slowdown
  }
}
```

### Contact Manager Tests (`playwright-validation.test.ts`)

| Test | Steps |
|------|-------|
| `should add a new contact successfully` | Reset → load page → fill form → submit → verify success message → verify form reset → verify contact in list → verify count incremented |
| `should delete a contact successfully` | Reset → load page → verify Demo contact → click delete → verify success message → verify contact removed → verify count decremented |

> `beforeEach` calls `POST /api/contacts/reset` to guarantee a clean state before each test.

### Registration Form Tests (`registration.test.ts`)

| Test | Steps |
|------|-------|
| `should proceed to step 2 when all fields are valid` | Fill step 1 → click Next → assert step 2 visible |
| `should proceed to step 3 when all fields are valid` | Fill step 1 + 2 → assert step 3 visible |
| `should display all entered information for confirmation` | Fill all steps → assert confirmation data matches input |

> Test data: John Doe, john.doe@example.com, 1234567890, DOB 25 years ago, 123 Main St, New York NY 10001, United States.

### File Upload Tests (`fileupload.test.ts`)

| Test | Steps |
|------|-------|
| `should upload the file` | Set `sample.txt` → verify `#file-info` visible → verify filename shown |
| `should display the file content` | Upload → verify `#content-section` visible → verify content contains "sample file" |
| `should publish the file` | Upload → verify content shown → click Publish → verify success message |

> Uses `src/assets/tests/sample.txt` as the test fixture file.

---

## NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `ts-node src/server.ts` | Start server with TypeScript directly |
| `npm run build` | `tsc` | Compile TypeScript to `dist/` |
| `npm start` | `node dist/server.js` | Start compiled JS server |
| `npm run start:js` | `node server.js` | Start standalone JS server (no TS) |
| `npm test` | `playwright test` | Run all Playwright tests |

---

## Running the App

```bash
# Start the server
npm run dev

# Run all tests (headless)
npm test

# Run tests with visible browser
npx playwright test --headed

# Run a specific module's tests
npx playwright test test/playwright-validation.test.ts --headed
npx playwright test test/registration.test.ts --headed
npx playwright test test/fileupload.test.ts --headed
```
