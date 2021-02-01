const express = require("express");
const router = express.Router();

const categoriesRouter = require("./categories");
const templatesRouter = require("./templates");

router.use("/categories", categoriesRouter);
router.use("/templates", templatesRouter);

module.exports = router;
