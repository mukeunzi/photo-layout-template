const asyncWrapper = (fn) => async (req, res, next) => await fn(req, res, next).catch(next);

module.exports = { asyncWrapper };
