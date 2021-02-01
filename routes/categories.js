const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../utils/error");
const CategoriesController = require("../controllers/categories");

router.get("/:id", asyncWrapper(CategoriesController.getCategory));
router.get("/", asyncWrapper(CategoriesController.getCategoryList));
router.post("/", asyncWrapper(CategoriesController.createCategory));
router.delete("/:id", asyncWrapper(CategoriesController.deleteCategory));
router.put("/:id", asyncWrapper(CategoriesController.updateCategory));

module.exports = router;
