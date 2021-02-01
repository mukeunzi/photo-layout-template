const validation = require("./validation");
const CategoryService = require("../../services/categories");
const TemplateService = require("../../services/templates");

const createTemplate = async (req, res, next) => {
	validation.validateInsertTemplate(req.body);
	const { categoryId, name } = req.body;

	if (!req.files.thumbnail) return res.status(400).json({ message: "템플릿의 썸네일 이미지를 첨부하세요." });
	if (!req.files.asset) return res.status(400).json({ message: "템플릿의 에쎗 파일을 첨부하세요." });

	const validCategory = await CategoryService.findOneById(categoryId);
	if (!validCategory) return res.status(400).json({ message: "유효하지 않은 카테고리 입니다." });
	const existsTemplate = await TemplateService.findOne(categoryId, name);
	if (existsTemplate) return res.status(400).json({ message: "이미 사용중인 이름입니다." });

	const thumbnailUrl = req.files.thumbnail[0].location;
	const assetUrl = req.files.asset[0].location;

	const created = await TemplateService.insertTemplate({ categoryId, name, thumbnailUrl, assetUrl });

	res.location(`/templates/${created.id}`);
	return res.status(201).json({ result: "템플릿이 생성되었습니다." });
};

const getTemplateList = async (req, res, next) => {
	const templateList = await TemplateService.findAll();
	const result = templateList.map((template) => {
		const { id, name, thumbnailUrl, assetUrl, visible } = template;
		const category = {
			id: template.category.id.toString(),
			name: template.category.name,
			visible: template.category.visible,
		};
		return { id: id.toString(), name, thumbnailUrl, assetUrl, visible, category };
	});

	return res.status(200).json({ result });
};

const deleteTemplate = async (req, res, next) => {
	const deleted = await TemplateService.deleteOneById(req.params.id);
	if (!deleted) return res.status(400).json({ message: "존재하지 않는 템플릿입니다." });

	return res.status(200).json({ result: "템플릿이 삭제되었습니다." });
};

module.exports = { createTemplate, getTemplateList, deleteTemplate };
