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

module.exports = { insertCategory, findOneByName };
