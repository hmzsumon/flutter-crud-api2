const productsController = require('../controllers/products.controller');
const express = require('express');
const router = express.Router();

// create product
router.post('/products', productsController.create);

// get all products
router.get('/products', productsController.findAll);

// get product by id
router.get('/products/:productId', productsController.findOne);

// update product
router.put('/products/:productId', productsController.update);

// delete product
router.delete('/products/:productId', productsController.delete);

module.exports = router;
