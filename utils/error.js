const createErrors = require("http-errors");

const ErrorMsg = (message, status = 500) => {
	throw new createErrors(status, message);
};

module.exports = { ErrorMsg };
