const productServices = require('../services/products.services');
const upload = require('../middleware/upload');

// create product
exports.create = (req, res, next) => {
	upload(req, res, function (err) {
		if (err) {
			next(err);
		} else {
			const url = req.protocol + '://' + req.get('host');
			const path =
				req.file != undefined ? req.file.path.replace(/\\/g, '/') : '';
			var model = {
				productName: req.body.productName,
				productPrice: req.body.productPrice,
				productDescription: req.body.productDescription,
				productImage: path != '' ? url + '/' + path : '',
			};

			productServices.createProduct(model, (err, result) => {
				if (err) {
					next(err);
				} else {
					res.status(200).send({
						message: 'Product created successfully',
						data: result,
					});
				}
			});
		}
	});
};

// find all products
exports.findAll = (req, res, next) => {
	console.log('req.query');
	var model = {
		productName: req.query.productName,
	};

	productServices.getProducts(model, (err, result) => {
		if (err) {
			next(err);
		} else {
			res.status(200).send({
				message: 'Products fetched successfully',
				data: result,
			});
		}
	});
};

// find product by id
exports.findOne = (req, res, next) => {
	var model = {
		productId: req.params.productId,
	};

	productServices.getProductById(model, (err, result) => {
		if (err) {
			next(err);
		} else {
			res.status(200).send({
				message: 'Product fetched successfully',
				data: result,
			});
		}
	});
};

// update product
exports.update = (req, res, next) => {
	upload(req, res, function (err) {
		if (err) {
			next(err);
		} else {
			const url = req.protocol + '://' + req.get('host');
			const path =
				req.file != undefined ? req.file.path.replace(/\\/g, '/') : '';
		}

		var model = {
			productId: req.params.productId,
			productName: req.body.productName,
			productPrice: req.body.productPrice,
			productDescription: req.body.productDescription,
			productImage: path != '' ? url + '/' + path : '',
		};

		productServices.updateProduct(model, (err, result) => {
			if (err) {
				next(err);
			} else {
				res.status(200).send({
					message: 'Product updated successfully',
					data: result,
				});
			}
		});
	});
};

// delete product
exports.delete = (req, res, next) => {
	var model = {
		productId: req.params.productId,
	};

	productServices.deleteProduct(model, (err, result) => {
		if (err) {
			next(err);
		} else {
			res.status(200).send({
				message: 'Product deleted successfully',
				data: result,
			});
		}
	});
};
