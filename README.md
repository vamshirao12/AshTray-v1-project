# AshTray

> A personal smoking-awareness and habit-tracking application designed to help users understand their smoking patterns, track progress, and make more intentional choices.

---

## Overview

AshTray is a full-stack web application built around one simple idea:

**Awareness comes before change.**

Instead of treating smoking habits as a simple counter, AshTray gives users a personal space to record cigarette usage, understand patterns, monitor spending, set daily limits, and track progress toward healthier habits.

The application combines habit tracking, analytics, challenges, craving support, achievements, and personal progress into one experience.

---

## Features

### 🔐 Authentication

- User registration and login
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected application routes
- Persistent user sessions

### 🚬 Cigarette Tracking

- Record cigarette entries
- Track brand, price, quantity, and timestamps
- View daily cigarette activity
- Edit and delete entries
- Maintain a personal smoking history

### 📊 Analytics

- Daily and weekly cigarette statistics
- Average cigarette consumption
- Spending insights
- Smoking pattern analysis
- Personal activity trends
- Visual analytics for easier understanding

### 🎯 Daily Limit

- Set a personal daily cigarette limit
- Update the limit from Settings
- Use the limit as part of the application's progress and challenge logic

### 🏆 Progress & Achievements

AshTray tracks progress through several milestones, including:

- Consistent tracking
- Lowering your average
- Reaching a 50% reduction
- Reaching a 75% reduction
- Working toward a zero-cigarette average

### 🌿 Craving Support

The Craving Help section provides simple actions users can take when experiencing an urge to smoke, such as:

- Delaying the decision
- Drinking water
- Changing the environment
- Keeping hands occupied
- Breaking automatic routines

### 🧩 Challenges

Personal challenges encourage users to stay aware of their habits and gradually work toward their goals.

### 👤 Personal Dashboard

The dashboard brings together:

- Today's activity
- Cigarettes consumed
- Money spent
- Daily limits
- Insights
- Weekly summaries
- Progress
- Quick actions

### 🧑‍💻 Builder / Project Story

AshTray also includes a dedicated Builder section describing the idea, development journey, technology stack, and engineering decisions behind the project.

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Recharts
- Lucide React
- Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- REST APIs

### Additional Technologies

- OpenAI API integration
- PostgreSQL infrastructure
- Redis infrastructure
- Docker Compose
- Jest
- Supertest

---

## How It Works

The application is divided into two main layers.

### Frontend

The React frontend provides the user interface and communicates with the backend through REST APIs.

It handles:

- Authentication screens
- Dashboard
- Analytics
- Challenges
- Craving Help
- Achievements
- Settings
- Builder
- User interactions and visualizations

### Backend

The Express backend provides the application API.

It handles:

- Authentication
- User accounts
- JWT authorization
- Cigarette entries
- Daily goals
- Database operations
- Application services

MongoDB is used as the primary application database.


## Architecture

AshTray follows a separated frontend/backend architecture.

```text
AshTray
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── docker-compose.yml
├── CONTRIBUTING.md
├── RUBRIC.md
├── .gitignore
└── README.md
