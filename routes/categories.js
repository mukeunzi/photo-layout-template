const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils");
const CategoriesController = require("../controllers/categories");

router.get("/:id", asyncWrapper(CategoriesController.getCategory));
router.get("/", asyncWrapper(CategoriesController.getCategoryList));
router.post("/", asyncWrapper(CategoriesController.createCategory));

module.exports = router;
