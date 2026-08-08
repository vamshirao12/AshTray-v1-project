# AshTray — Product Requirements Document (PRD)

## 1. Product overview
AshTray is a web application for logging cigarette use and helping users understand their smoking patterns. The application combines a React frontend, an Express/Node.js backend, MongoDB as the primary application database, and supporting infrastructure for PostgreSQL, Redis, WebSocket communication, scheduled jobs, and AI coaching.

## 2. Problem statement
Users who want to reduce smoking need a simple way to:
- record smoking activity;
- record quantity, price, brand, and trigger;
- see daily and monthly patterns;
- set a daily cigarette limit;
- review spending and habit trends;
- receive supportive guidance around cravings.

The engineering goal is to turn individual logs into useful, understandable feedback while keeping authentication and user data isolated.

## 3. Target user
A user who wants to monitor or gradually reduce smoking behavior.

## 4. Core user journeys
### 4.1 Account creation
1. User opens Signup.
2. Frontend validates required fields.
3. Frontend calls `POST /api/auth/signup`.
4. Backend validates the request and checks whether the email already exists.
5. Password is hashed with bcrypt.
6. User is stored in MongoDB.

### 4.2 Login
1. User submits email/password.
2. Frontend calls `POST /api/auth/login`.
3. Backend finds the user and compares the password hash.
4. Backend signs a JWT.
5. Frontend stores the token and navigates to `/dashboard`.
6. Axios adds the token to protected API requests.

### 4.3 Log an activity
1. User opens the activity modal.
2. Controlled inputs collect brand, price, quantity, and trigger.
3. Frontend validates basic input.
4. Frontend sends `POST /api/entries`.
5. JWT middleware authenticates the request.
6. Controller validates and normalizes values.
7. Mongoose creates the Entry document linked to the authenticated user.
8. Dashboard refreshes the entries.

### 4.4 View dashboard
The dashboard fetches entries and profile information, filters entries by date, and derives today's activity, spending, cigarette count, and daily-limit progress.

### 4.5 Update daily limit
The settings/dashboard flow calls `PUT /api/auth/daily-goal`. The backend validates the minimum value and updates the authenticated user's MongoDB document.

### 4.6 Delete an activity
The frontend sends `DELETE /api/entries/:id`. The backend checks that the entry belongs to the authenticated user before deleting it.

## 5. Functional requirements
- User signup and login.
- JWT-protected application routes/API endpoints.
- Create, read, update, and delete smoking entries.
- Store brand, price, quantity, trigger, user reference, and timestamps.
- Set and retrieve daily cigarette limit.
- Dashboard and analytics views.
- Loading and error states.
- Responsive UI.
- Supportive AI coaching module.
- Optional supporting services: PostgreSQL, Redis, WebSocket, cron.

## 6. Non-functional requirements
- Authentication must prevent access to another user's entries.
- Passwords must never be stored in plaintext.
- Secrets must come from environment variables.
- API failures should return useful HTTP status codes and JSON error messages.
- API requests should be rate-limited.
- UI should remain usable on smaller screens.
- The codebase should be modular enough to replace or extend individual services.

## 7. Data ownership rule
Every Entry belongs to exactly one User through `Entry.user`. Protected controllers use the authenticated JWT identity when querying or mutating entries.

## 8. Out of scope / not currently complete
The repository contains infrastructure or dependencies for some rubric items that are not fully wired into the main user flow:
- OAuth provider integration.
- Stripe/payment flow.
- Full RAG/vector retrieval pipeline.
- A production multi-step agent.
- Production hosting for PostgreSQL/Redis.
- Full Dockerization of the application.
- SSR.
- Comprehensive API/integration test suite.

These should not be claimed as completed features in the viva unless they are implemented and demonstrated.
