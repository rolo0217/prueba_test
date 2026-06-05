# Contact Manager

A fully functional web application for managing contacts, built with Node.js, TypeScript, Express, and Playwright.

## Getting Started

### Install dependencies
```bash
npm install
npx playwright install
```

### Run the development server
```bash
npm run dev
```
Visit: http://localhost:8000

### Build for production
```bash
npm run build
npm start
```

### Run Playwright tests
```bash
npm test
```

## Project Structure

```
contact-manager/
├── src/
│   ├── server.ts          # Express server entry point
│   ├── assets/tests/      # Static test assets
│   └── routes/
│       ├── api.ts         # REST API routes (/api/contacts)
│       ├── index.html     # Frontend UI
│       ├── app.css        # Styles
│       └── app.js         # Frontend logic
├── test/
│   └── playwright-validation.test.ts   # Playwright tests
├── playwright-tests/
│   └── playwright-spec.ts              # Server helper spec
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## API Endpoints

| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| GET    | /api/contacts        | Get all contacts    |
| POST   | /api/contacts        | Add a new contact   |
| DELETE | /api/contacts/:id    | Delete a contact    |
