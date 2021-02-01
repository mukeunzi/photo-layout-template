const { v1: uuidV1 } = require("uuid");

const timestampOnlyUUID = () => {
	const [time1, time2, time3] = uuidV1().split("-");
	const uuid = time3 + time2 + time1;
	return uuid;
};

module.exports = { timestampOnlyUUID };
