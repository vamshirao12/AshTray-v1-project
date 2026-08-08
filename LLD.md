# AshTray — Low-Level Design (LLD)

## 1. Backend file responsibilities

| File | Responsibility |
|---|---|
| `backend/server.js` | Creates Express app, middleware, routes, HTTP server, WebSocket, PostgreSQL initialization, cron startup |
| `backend/config/db.js` | MongoDB connection |
| `backend/config/cors.js` | CORS policy |
| `backend/controllers/authController.js` | Signup, login, profile, daily goal |
| `backend/controllers/entryController.js` | Entry CRUD |
| `backend/middleware/authMiddleware.js` | JWT extraction and verification |
| `backend/middleware/errorHandler.js` | Final error response |
| `backend/middleware/rateLimit.js` | Request rate limiting |
| `backend/middleware/validate.js` | Zod body validation helper |
| `backend/models/user.js` | User schema |
| `backend/models/Entry.js` | Entry schema |
| `backend/routes/auth.js` | Auth endpoints |
| `backend/routes/entries.js` | Entry endpoints |
| `backend/ai/assistant.js` | LLM coaching, streaming, embeddings |
| `backend/ai/tools.js` | Function tool definition/execution |
| `backend/ai/evals.json` | AI evaluation examples |
| `backend/db/postgres.js` | PostgreSQL pool/schema/index/JOIN |
| `backend/services/sqlService.js` | PostgreSQL event service |
| `backend/services/redis.js` | Redis cache helper |
| `backend/services/socket.js` | WebSocket server |
| `backend/services/cron.js` | Scheduled jobs |
| `backend/tests/health.test.js` | Jest test runner smoke test |

## 2. Mongo schemas

### User
```text
User
- email: String, required, unique, lowercase, trim
- password: String, required
- totpSecret: String
- twoFactorEnabled: Boolean
- dailyGoal: Number, default 10
- streak: Number, default 0
- createdAt / updatedAt
```

### Entry
```text
Entry
- brand: String, required, trim
- price: Number, required, min 0
- quantity: Number, default 1, min 1
- trigger: String, default "Not specified"
- user: ObjectId -> User, required
- date: Date
- createdAt / updatedAt
```

## 3. REST API

### Authentication
`POST /api/auth/signup`
- Request: `{ email, password }`
- Success: 201
- Invalid input: 400
- Duplicate email: 400
- Unexpected failure: 500

`POST /api/auth/login`
- Request: `{ email, password }`
- Success: 200 with JWT
- Invalid credentials: 400
- Unexpected failure: 500

`GET /api/auth/me`
- Protected
- Success: 200
- Missing/invalid JWT: 401

`PUT /api/auth/daily-goal`
- Protected
- Request: `{ dailyGoal }`
- Invalid goal: 400
- Success: 200

### Entries
`GET /api/entries`
- Protected
- Returns only entries belonging to `req.user.id`
- Sorted newest first

`POST /api/entries`
- Protected
- Request: `{ brand, price, quantity, trigger }`
- Success: 201

`PUT /api/entries/:id`
- Protected
- Verifies entry ownership
- Missing entry: 404
- Wrong owner: 401
- Success: 200

`DELETE /api/entries/:id`
- Protected
- Verifies entry ownership
- Missing entry: 404
- Wrong owner: 401
- Success: 200

## 4. Authentication sequence

```text
Signup
Browser -> POST /signup -> validate -> bcrypt.hash -> MongoDB

Login
Browser -> POST /login -> MongoDB lookup -> bcrypt.compare
       -> jwt.sign({id,email}, JWT_SECRET, expiresIn 7d)
       -> token returned

Protected request
Browser -> Authorization: Bearer <token>
       -> authMiddleware
       -> jwt.verify(token, JWT_SECRET)
       -> req.user = decoded
       -> controller
```

## 5. Authorization / ownership
Authentication answers "who is the user?"
Authorization answers "can this user modify this resource?"

For entries, the controller checks:
```js
entry.user.toString() === req.user.id
```
before update/delete.

This prevents one authenticated user from modifying another user's entry by guessing an entry ID.

## 6. Frontend state and effects

Example from `Dashboard.jsx`:
```js
const [entries, setEntries] = useState([]);
const [dailyLimit, setDailyLimit] = useState(10);

useEffect(() => {
  fetchEntries();
  fetchProfile();
}, []);
```

`useState` stores changing UI/data state. `useEffect` runs the initial data-fetch side effect after the component mounts.

## 7. Controlled form example
`AddEntryModal.jsx` keeps all form values in `formData`.
Each input uses:
```js
value={formData.brand}
onChange={handleChange}
```
The React state is therefore the source of truth for the input.

## 8. Axios interceptor
`frontend/src/services/api.js` adds:
```text
Authorization: Bearer <token>
```
to requests when a token exists in local storage.

This centralizes authentication headers instead of repeating token construction for every request.

## 9. Analytics
The analytics page derives:
- cigarette totals;
- spending totals;
- averages;
- trigger frequencies;
- weekly/monthly/yearly chart data.

React `useMemo` is used to avoid recomputing derived datasets unless dependencies change.

## 10. AI design
`assistant.js`:
- creates an OpenAI client only when `OPENAI_API_KEY` exists;
- sends a system prompt and serialized context;
- requests JSON output for `coach`;
- supports token streaming in `streamCoach`;
- supports embeddings with `text-embedding-3-small`.

`tools.js` defines:
`get_weekly_summary(userId)`

Important limitation:
There is no complete route/controller in the current repository that wires these AI functions into the main frontend. Treat them as implemented AI modules/infrastructure, not as a fully integrated user-facing feature.

## 11. PostgreSQL design
```sql
users_shadow
- user_id PK
- email

habit_events
- id PK
- user_id FK -> users_shadow.user_id
- event_type
- value
- created_at
```

The JOIN:
```sql
SELECT ...
FROM habit_events e
JOIN users_shadow u
  ON u.user_id = e.user_id
...
```

The index:
```sql
(user_id, created_at DESC)
```
supports the common pattern of retrieving one user's newest events.

## 12. Redis design
`cacheGet`:
- returns null when Redis is not configured;
- connects lazily;
- catches Redis failures so cache availability does not crash the app.

`cacheSet`:
- writes a value with an expiry TTL.

## 13. WebSocket design
The server attaches `WebSocketServer` at `/ws`.
On connection:
```json
{"type":"connected","message":"AshTray realtime channel ready"}
```
A `broadcast` helper can send JSON payloads to connected clients.

## 14. Cron design
Two scheduled jobs are registered:
- `0 0 * * *` — daily refresh
- `0 0 1 * *` — monthly refresh

## 15. Testing
Jest is configured through the backend package script:
`npm test`

Current repository test:
`backend/tests/health.test.js`

It is a smoke test of the test runner, not a full API integration suite. Do not claim comprehensive automated API testing yet.
