const path = require("path");
const filePath = path.join(__dirname, "../file");

const thumbnailPath = `${filePath}/photo.jpg`;

const assetPath = `${filePath}/photos.zip`;

module.exports = { thumbnailPath, assetPath };
