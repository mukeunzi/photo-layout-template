const { v1: uuidV1 } = require("uuid");

const { template } = require("../models");

const insertTemplate = async (data) => {
	const { categoryId, name, thumbnailUrl, assetUrl } = data;
	const [time1, time2, time3] = uuidV1().split("-");
	const uuid = time3 + time2 + time1;

	const createdTemplate = await template.create({ id: uuid, category_id: categoryId, name, thumbnailUrl, assetUrl });
	return createdTemplate;
};

const findOne = async (categoryId, name) => {
	const result = await template.findOne({ where: { category_id: categoryId, name } });
	return result;
};

module.exports = { insertTemplate, findOne };
