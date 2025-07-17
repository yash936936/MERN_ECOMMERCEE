const express = require('express');
const axios = require('axios');
const Product = require("../models/productModel");
require('dotenv').config({ path: '../config/config.env' });

const SHOPIFY_API_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-07`;

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getAllProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Get all products
router.get('/api/v1/products', getAllProducts);

// Get product details
router.get('/api/v1/product/:id', getProductDetails);

// Create new product (Admin)
router.post('/api/v1/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), createProduct);

// Update product (Admin)
router.put('/api/v1/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct);

// Delete product (Admin)
router.delete('/api/v1/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

// Get all admin products
router.get('/api/v1/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);

// Create new review
router.put('/api/v1/review', isAuthenticatedUser, createProductReview);

// Get product reviews
router.get('/api/v1/reviews', getProductReviews);

// Delete review
router.delete('/api/v1/reviews', isAuthenticatedUser, deleteReview);

module.exports = router;