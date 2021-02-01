const { Op } = require("sequelize");

const { template, category } = require("../models");
const { timestampOnlyUUID } = require("../utils");

const insertTemplate = async (data) => {
	const { categoryId, name, thumbnailUrl, assetUrl } = data;

	const createdTemplate = await template.create({
		id: timestampOnlyUUID(),
		categoryId,
		name,
		thumbnailUrl,
		assetUrl,
	});
	return createdTemplate;
};

const findAll = async () => {
	const result = await template.findAll({
		attributes: ["id", "name", "thumbnailUrl", "assetUrl", "visible"],
		include: [{ model: category, as: "category", attributes: ["id", "name", "visible"] }],
	});
	return result;
};

const findOne = async (categoryId, name) => {
	const result = await template.findOne({ where: { categoryId, name } });
	return result;
};

const findOneById = async (id) => {
	const result = await template.findByPk(id, {
		attributes: ["id", "name", "thumbnailUrl", "assetUrl", "visible"],
	});
	return result;
};

const searchAll = async (name) => {
	const result = await template.findAll({
		where: { name: { [Op.substring]: name }, visible: 1 },
		attributes: ["id", "name", "thumbnailUrl", "assetUrl", "visible"],
		include: [{ model: category, as: "category", attributes: ["id", "name", "visible"], where: { visible: 1 } }],
	});
	return result;
};

const deleteOneById = async (id) => {
	const result = await template.destroy({ where: { id } });
	return result;
};

const updateOne = async (id, categoryId, name, visible) => {
	await template.update({ categoryId, name, visible: parseInt(visible, 10) }, { where: { id } });
};

module.exports = { insertTemplate, findAll, findOne, findOneById, searchAll, deleteOneById, updateOne };
