const express = require('express');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Get all categories
router.get('/', getAllCategories);

// Admin routes
router
  .route('/admin/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createCategory);

router
  .route('/admin/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

module.exports = router;