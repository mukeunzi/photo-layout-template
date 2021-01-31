const { ErrorMsg } = require("../../utils/error");

const validateCategory = (category) => {
	const { name } = category;
	if (!name || !name.length) return ErrorMsg({ message: "카테고리 이름을 입력하세요." }, 400);

	return true;
};

module.exports = { validateCategory };
