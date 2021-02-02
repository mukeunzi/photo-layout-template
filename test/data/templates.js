const path = require("path");
const filePath = path.join(__dirname, "../file");

const thumbnailPath = `${filePath}/photo.jpg`;

const assetPath = `${filePath}/photos.zip`;

const updateTemplate = {
	name: `수정템플릿${Date.now()}`,
	visible: "1",
};

module.exports = { thumbnailPath, assetPath, updateTemplate };
