const { category } = require("../models");
const { timestampOnlyUUID } = require("../utils");

const insertCategory = async (name) => {
	const createdCategory = await category.create({ id: timestampOnlyUUID(), name });
	return createdCategory;
};

const findOneByName = async (name) => {
	const result = await category.findOne({ where: { name } });
	return result;
};

const findAll = async () => {
	const result = await category.findAll({
		attributes: ["id", "name", "visible"],
	});
	return result;
};

const findOneById = async (id) => {
	const result = await category.findByPk(id, {
		attributes: ["id", "name", "visible"],
	});
	return result;
};

const deleteOneById = async (id) => {
	const result = await category.destroy({ where: { id } });
	return result;
};

const updateOne = async (id, name, visible) => {
	await category.update({ name, visible: parseInt(visible, 10) }, { where: { id } });
};

module.exports = { insertCategory, findOneByName, findAll, findOneById, deleteOneById, updateOne };
