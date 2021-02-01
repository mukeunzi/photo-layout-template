const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils");
const TemplatesController = require("../controllers/templates");
const { upload } = require("../utils/aws");

const fileUpload = upload.fields([
	{ name: "thumbnail", maxCount: 1 },
	{ name: "asset", maxCount: 1 },
]);
router.post("/", fileUpload, asyncWrapper(TemplatesController.createTemplate));

module.exports = router;