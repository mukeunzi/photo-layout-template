const { ErrorMsg } = require("../../utils/error");

const validateInsertCategory = (category) => {
	const { name } = category;
	if (!name || !name.length) return ErrorMsg({ message: "카테고리 이름을 입력하세요." }, 400);

	return true;
};

const validateUpdateCategory = (category) => {
	const { name, visible } = category;
	if (!name || !name.length) return ErrorMsg({ message: "카테고리 이름을 입력하세요." }, 400);

	if (!visible) return ErrorMsg({ message: "카테고리 노출여부를 선택하세요." }, 400);
	if (!["0", "1"].includes(visible)) return ErrorMsg({ message: "카테고리 노출여부를 다시 선택하세요." }, 400);

	return true;
};

module.exports = { validateInsertCategory, validateUpdateCategory };
