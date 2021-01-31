const { v1: uuidV1 } = require("uuid");

const { category } = require("../models");

const insertCategory = async (name) => {
	const [time1, time2, time3] = uuidV1().split("-");
	const uuid = time3 + time2 + time1;

	const createdCategory = await category.create({ id: uuid, name });
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
