const Product = require("../models/productModel");
const Category = require("../models/categoryModel"); // Add this line
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    // Validate category
    const category = await Category.findById(req.body.category);
    if (!category) {
      return next(new ErrorHander("Invalid category", 400));
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return next(new ErrorHander("Error creating product", 500));
  }
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    // Include category information in the query
    apiFeature.query = apiFeature.query.populate('category', 'name');

    const products = await apiFeature.query;
    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);
    const paginatedProducts = await apiFeature.query;

    res.status(200).json({
      success: true,
      products: paginatedProducts,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return next(new ErrorHander("Error fetching products", 500));
  }
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return next(new ErrorHander("Error fetching admin products", 500));
  }
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return next(new ErrorHander("Error fetching product details", 500));
  }
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return next(new ErrorHander("Error updating product", 500));
  }
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return next(new ErrorHander("Error deleting product", 500));
  }
});

// Create New Review or Update Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return next(new ErrorHander("Error creating review", 500));
  }
});

// Get All Reviews of a Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return next(new ErrorHander("Error fetching reviews", 500));
  }
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return next(new ErrorHander("Error deleting review", 500));
  }
});
