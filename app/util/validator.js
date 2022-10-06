const {validationResult} = require('express-validator');

const {response, ErrorType, ErrorCode} = require('./response');

const validate = (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res
			.status(ErrorCode[ErrorType.DATA_ERROR])
			.json(response(false, errors.array().map((e) => `${e.msg} for parameter ${e.param}`).join(', ')));

		return false;
	}

	return true;
};

module.exports = {
	validate
};
