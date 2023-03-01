const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const fileFilter = (req, file, cb) => {
	const validExts = ['.jpg', '.jpeg', '.png', '.webp'];
	if (!validExts.includes(path.extname(file.originalname).toLowerCase())) {
		return cb(new Error('Only jpg, jpeg and png files are allowed!'));
	}
	const fileSize = parseInt(req.headers['content-length']);

	if (fileSize > 1048576) {
		return cb(new Error('File size is too large. Max limit is 10MB'));
	}

	cb(null, true);
};

let upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	fileSize: 1048576, // 10MB
});

module.exports = upload.single('productImage');
