const createErrors = require("http-errors");

const ErrorMsg = (message, status = 500) => {
	throw new createErrors(status, message);
};

const asyncWrapper = (fn) => async (req, res, next) => await fn(req, res, next).catch(next);

module.exports = { ErrorMsg, asyncWrapper };
