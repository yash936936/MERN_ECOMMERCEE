const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: [50, 'Category name cannot exceed 50 characters']
  }
});

module.exports = mongoose.model('Category', categorySchema);