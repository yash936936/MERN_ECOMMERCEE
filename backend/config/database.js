const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');

// Load environment variables from config directory
dotenv.config({ 
  path: path.join(__dirname, 'config.env') 
});

const connectDatabase = () => {
  if (!process.env.DB_URI) {
    console.error('DB_URI is not defined in environment variables');
    console.error('Current environment variables:', process.env);
    process.exit(1);
  }

  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`MongoDB connected successfully`);
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  });
};

module.exports = connectDatabase;
