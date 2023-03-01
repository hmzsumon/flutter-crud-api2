const mongoose = require('mongoose');

const product = mongoose.model(
	'product',
	mongoose.Schema(
		{
			productName: String,
			productPrice: Number,
			productImage: String,
			productDescription: String,
		},
		{
			timestamps: true,
		}
	)
);

module.exports = {
	product,
};
