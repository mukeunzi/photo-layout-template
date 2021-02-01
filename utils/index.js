const { v1: uuidV1 } = require("uuid");

const timestampOnlyUUID = () => {
	const [time1, time2, time3] = uuidV1().split("-");
	const uuid = time3 + time2 + time1;
	return uuid;
};

const getFileName = (fileAccessUrl) => {
	const regExp = /amazonaws.com\//g;
	const match = regExp.exec(fileAccessUrl);
	if (!match) return 0;

	const startIndex = regExp.lastIndex;
	const fileName = fileAccessUrl.substring(startIndex);
	return fileName;
};

const getFileExtension = (fileName) => {
	const nameEndIndex = fileName.lastIndexOf(".");
	const extension = fileName.substring(nameEndIndex);
	return extension;
};

const getDate = () => {
	const [date, time] = new Date().toISOString().replace("T", " ").substring(0, 19).split(" ");
	const result = `${date}-${time.split(":").join("-")}`;
	return result;
};

module.exports = { timestampOnlyUUID, getFileName, getFileExtension, getDate };
