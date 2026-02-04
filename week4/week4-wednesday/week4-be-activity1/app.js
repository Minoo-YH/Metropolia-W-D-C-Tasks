// Import database connection function
const connectDB = require("./config/db");

// Import core dependencies
const express = require("express");

// Import routers
const carRouter = require("./routes/carRouter");
const blogRouter = require("./routes/blogRouter");
const userRouter = require("./routes/userRouter");

// Import custom middleware
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");

// Create express application
const app = express();

// Connect to MongoDB
connectDB();

// Built-in middleware to parse JSON bodies
app.use(express.json());

// Log all incoming requests
app.use(requestLogger);

// Root route (health check)
app.get("/", (req, res) => {
  res.send("API Running!");
});

// --------------------
// API routes
// --------------------

// Car routes
// All routes starting with /api/cars will be handled by carRouter
app.use("/api/cars", carRouter);

// Blog routes
// All routes starting with /api/blogs will be handled by blogRouter
app.use("/api/blogs", blogRouter);

// User routes
// All routes starting with /api/users will be handled by userRouter
app.use("/api/users", userRouter);

// --------------------
// Error handling
// --------------------

// Middleware for handling unknown endpoints
app.use(unknownEndpoint);

// Centralized error handling middleware
app.use(errorHandler);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
