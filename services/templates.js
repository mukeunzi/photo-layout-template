const { template } = require("../models");
const { timestampOnlyUUID } = require("../utils");

const insertTemplate = async (data) => {
	const { categoryId, name, thumbnailUrl, assetUrl } = data;

	const createdTemplate = await template.create({
		id: timestampOnlyUUID(),
		category_id: categoryId,
		name,
		thumbnailUrl,
		assetUrl,
	});
	return createdTemplate;
};

const findOne = async (categoryId, name) => {
	const result = await template.findOne({ where: { category_id: categoryId, name } });
	return result;
};

module.exports = { insertTemplate, findOne };
