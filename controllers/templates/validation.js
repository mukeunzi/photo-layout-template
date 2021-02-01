const { ErrorMsg } = require("../../utils/error");

const validateInsertTemplate = (template) => {
	const { categoryId, name } = template;

	if (!categoryId || !categoryId.length) return ErrorMsg({ message: "카테고리를 선택하세요." }, 400);
	if (!name || !name.length) return ErrorMsg({ message: "템플릿 이름을 입력하세요." }, 400);

	return true;
};

module.exports = { validateInsertTemplate };
