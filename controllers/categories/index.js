const validation = require("./validation");
const CategoryService = require("../../services/categories");

const createCategory = async (req, res, next) => {
	const { body } = req;
	validation.validateInsertCategory({ name: body.name });

	const existsName = await CategoryService.findOneByName(body.name);
	if (existsName) return res.status(400).json({ message: "이미 사용중인 이름입니다." });

	const created = await CategoryService.insertCategory(body.name);

	res.location(`/categories/${created.id}`);
	return res.status(201).json({ result: "카테고리가 생성되었습니다." });
};

const getCategoryList = async (req, res, next) => {
	const categoryList = await CategoryService.findAll();
	const result = categoryList.map((category) => {
		const { id, name, visible } = category;
		return { id: id.toString(), name, visible };
	});

	return res.status(200).json({ result });
};

const getCategory = async (req, res, next) => {
	const category = await CategoryService.findOneById(req.params.id);
	if (!category) return res.status(404).json({ message: "존재하지 않는 카테고리입니다." });

	const { id, name, visible } = category;
	const result = { id: id.toString(), name, visible };
	return res.status(200).json({ result });
};

const deleteCategory = async (req, res, next) => {
	const deleted = await CategoryService.deleteOneById(req.params.id);
	if (!deleted) return res.status(400).json({ message: "존재하지 않는 카테고리입니다." });

	return res.status(200).json({ result: "카테고리가 삭제되었습니다." });
};

module.exports = { createCategory, getCategoryList, getCategory, deleteCategory };
