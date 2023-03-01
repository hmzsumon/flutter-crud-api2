const { product } = require('../models/products.model');

// create product
async function createProduct(params, callback) {
	if (!params.productName) {
		return callback({
			message: 'Product name is required',
		});
	}

	const productModel = new product(params);
	productModel
		.save()
		.then((response) => {
			return callback(null, response);
		})
		.catch((error) => {
			return callback(error);
		});
}

// get products
async function getProducts(params, callback) {
	const productName = params.productName;
	var condition = productName
		? { productName: { $regex: new RegExp(productName), $options: 'i' } }
		: {};

	product
		.find(condition)
		.then((response) => {
			return callback(null, response);
		})
		.catch((error) => {
			return callback(error);
		});
}

// get product by id
async function getProductById(params, callback) {
	const productId = params.productId;
	product
		.findById(productId)
		.then((response) => {
			if (!response) {
				return callback({
					message: 'Product not found',
				});
			} else {
				return callback(null, response);
			}
		})
		.catch((error) => {
			return callback(error);
		});
}

// update product
async function updateProduct(params, callback) {
	const productId = params.productId;

	product
		.findByIdAndUpdate(productId, params, { useFindAndModify: false })
		.then((response) => {
			if (!response) {
				return callback({
					message: 'Product not found',
				});
			} else {
				return callback(null, response);
			}
		})
		.catch((error) => {
			return callback(error);
		});
}

// delete product
async function deleteProduct(params, callback) {
	const productId = params.productId;

	product
		.findByIdAndRemove(productId)
		.then((response) => {
			if (!response) {
				return callback({
					message: 'Product not found',
				});
			} else {
				return callback(null, response);
			}
		})
		.catch((error) => {
			return callback(error);
		});
}

module.exports = {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
};
