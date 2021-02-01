const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils/error");
const TemplatesController = require("../controllers/templates");
const { upload } = require("../utils/aws");

router.get("/", asyncWrapper(TemplatesController.getTemplateList));

const fileUpload = upload.fields([
	{ name: "thumbnail", maxCount: 1 },
	{ name: "asset", maxCount: 1 },
]);
router.post("/", fileUpload, asyncWrapper(TemplatesController.createTemplate));

module.exports = router;
