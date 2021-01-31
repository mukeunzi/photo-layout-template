const validation = require("./validation");
const CategoryService = require("../../services/categories");

const createCategory = async (req, res, next) => {
	const { body } = req;
	validation.validateCategory({ name: body.name });

	const existsName = await CategoryService.findOneByName(body.name);
	if (existsName) return res.status(400).json({ message: "이미 사용중인 이름입니다." });

	const created = await CategoryService.insertCategory(body.name);

	res.location(`/categories/${created.id}`);
	return res.status(201).json({ result: "카테고리가 생성되었습니다." });
};

module.exports = { createCategory };
