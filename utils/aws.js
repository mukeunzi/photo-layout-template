const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.AWS_S3_BUCKET_NAME,
		acl: "public-read",
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			const extension = path.extname(file.originalname);
			const fileName = encodeURIComponent(path.basename(file.originalname, extension));
			cb(null, `${Date.now()}-${fileName}${extension}`);
		},
	}),
});

module.exports = { s3, upload };
