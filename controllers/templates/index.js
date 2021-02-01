const validation = require("./validation");
const CategoryService = require("../../services/categories");
const TemplateService = require("../../services/templates");
const { s3 } = require("../../utils/aws");
const { getFileName, getFileExtension, getDate } = require("../../utils");

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

const searchTemplateByName = async (req, res, next) => {
	if (!req.query.q) return res.redirect(302, "/");

	const name = req.query.q;
	const templateList = await TemplateService.searchAll(name);
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

const updateTemplate = async (req, res, next) => {
	const { id } = req.params;
	const { categoryId, name, visible } = req.body;

	const template = await TemplateService.findOneById(id);
	if (!template) return res.status(400).json({ message: "존재하지 않는 템플릿입니다." });
	const category = await CategoryService.findOneById(categoryId);
	if (!category) return res.status(400).json({ message: "존재하지 않는 카테고리입니다." });

	validation.validatePatchTemplate({ name, visible });

	await TemplateService.updateOne(id, categoryId, name, visible);
	return res.status(200).json({ result: { id, categoryId, name, visible } });
};

const downloadFile = async (req, res, next) => {
	const { id, fileType } = req.params;

	const template = await TemplateService.findOneById(id);
	if (!template) return res.status(400).json({ message: "존재하지 않는 템플릿입니다." });

	validation.validateDownloadTemplate({ fileType });

	const urls = { thumbnail: template.thumbnailUrl, asset: template.assetUrl };
	const fileName = getFileName(urls[fileType]);
	if (!fileName) return res.status(400).json({ message: "파일을 다운로드할 수 없습니다." });

	const params = {
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: fileName,
	};
	const fileStream = s3.getObject(params).createReadStream();
	res.attachment(`pixo-template-${fileType}-${getDate()}${getFileExtension(fileName)}`);
	fileStream.pipe(res);
};

module.exports = {
	createTemplate,
	getTemplateList,
	searchTemplateByName,
	deleteTemplate,
	updateTemplate,
	downloadFile,
};
