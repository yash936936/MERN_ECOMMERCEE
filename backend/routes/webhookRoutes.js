const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

router.post('/webhooks/products', async (req, res) => {
  const { id, title, variants, image, body_html } = req.body;
  try {
    await Product.findOneAndUpdate(
      { shopifyId: id.toString() },
      {
        shopifyId: id.toString(),
        title,
        price: variants[0]?.price,
        image: image?.src,
        description: body_html,
      },
      { upsert: true }
    );
    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(500).send('Webhook processing failed');
  }
});

module.exports = router;