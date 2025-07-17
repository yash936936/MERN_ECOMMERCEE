const dotenv = require('dotenv');
const path = require('path');

// Load environment variables first
require('dotenv').config({ 
  path: path.join(__dirname, 'config/config.env') 
});

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Validate required environment variables
if (!process.env.DB_URI) {
  console.error('DB_URI is not defined in environment variables');
  console.error('Current environment variables:', process.env);
  process.exit(1);
}

if (!process.env.PORT) {
  console.error('PORT is not defined in environment variables');
  process.exit(1);
}

const express = require('express');
const app = express();
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const errorMiddleware = require('./middleware/error');

// Import routes
const webhookRoutes = require('./routes/webhookRoutes');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');

// Connect to database
connectDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Webhook routes should be first
app.use('/api/webhook', webhookRoutes);

// Product routes
app.use('/api/v1/products', productRoute);

// Category routes
app.use('/api/v1/categories', categoryRoute);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Error handling middleware
app.use(errorMiddleware);

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
