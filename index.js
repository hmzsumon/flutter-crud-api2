const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_DB_CONFIG } = require('./config/app.config');
const errors = require('./middleware/errors');
const swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json');

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose
	.connect(MONGO_DB_CONFIG.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log('Error connecting to MongoDB', err);
	});

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', require('./routes/app.routes'));
app.use(errors.errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.port || 4000, () => {
	console.log(
		`Server started on port http://localhost:${process.env.port || 4000}`
	);
});
