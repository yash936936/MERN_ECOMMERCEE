const Category = require('../models/categoryModel');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get all categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories: categories.map(category => category.name)
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return next(new ErrorHander("Error fetching categories", 500));
  }
});

// Create category (Admin)
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name } = req.body;
    
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return next(new ErrorHander("Category already exists", 400));
    }
    
    const category = await Category.create({ name });
    
    res.status(201).json({
      success: true,
      category
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return next(new ErrorHander("Error creating category", 500));
  }
});

// Update category (Admin)
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return next(new ErrorHander("Category not found", 404));
    }

    // Check if new name already exists
    const existingCategory = await Category.findOne({ 
      name: req.body.name,
      _id: { $ne: req.params.id }
    });
    
    if (existingCategory) {
      return next(new ErrorHander("Category name already exists", 400));
    }
    
    category.name = req.body.name;
    await category.save();
    
    res.status(200).json({
      success: true,
      category
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return next(new ErrorHander("Error updating category", 500));
  }
});

// Delete category (Admin)
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return next(new ErrorHander("Category not found", 404));
    }

    // Check if any products are using this category
    const products = await Product.find({ category: req.params.id });
    if (products.length > 0) {
      return next(new ErrorHander("Cannot delete category as it's being used by products", 400));
    }
    
    await category.remove();
    
    res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return next(new ErrorHander("Error deleting category", 500));
  }
});