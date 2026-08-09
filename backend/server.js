require("dotenv").config();

const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const corsMiddleware = require("./config/cors");

const errorHandler = require("./middleware/errorHandler");
const globalLimit = require("./middleware/rateLimit");

const authRoutes = require("./routes/auth");
const entryRoutes = require("./routes/entries");
const testRoutes = require("./routes/test");

const { initPostgres } = require("./db/postgres");
const { attachWebSocket } = require("./services/socket");
const { startJobs } = require("./services/cron");

const app = express();

// ===============================
// DATABASE
// ===============================
connectDB();

// ===============================
// MIDDLEWARE
// ===============================
app.use(corsMiddleware);

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(cookieParser());

app.use(globalLimit);

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    project: "AshTray",
    version: "3.0.0",
  });
});

// ===============================
// ROUTES
// ===============================
app.use("/api/test", testRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/entries", entryRoutes);

// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===============================
// ERROR HANDLER
// ===============================
app.use(errorHandler);

// ===============================
// HTTP SERVER
// ===============================
const server = http.createServer(app);

// ===============================
// WEBSOCKET
// ===============================
const wss = attachWebSocket(server);

// ===============================
// PORT
// ===============================
const PORT = process.env.PORT || 5000;

// ===============================
// START SERVER
// ===============================
server.listen(PORT, async () => {
  console.log(`🚀 AshTray Server Running on Port ${PORT}`);

  try {
    await initPostgres();
    console.log("✅ PostgreSQL ready");
  } catch (err) {
    console.log("ℹ️ PostgreSQL optional: not connected");
  }

  startJobs();
});

// ===============================
// EXPORTS
// ===============================
module.exports = {
  app,
  server,
  wss,
};