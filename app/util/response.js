const ErrorType = {
	DATA_ERROR: 'DATA_ERROR',
	INTERNAL_ERROR: 'INTERNAL_ERROR',
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
	NOT_FOUND: 'NOT_FOUND'
};

const ErrorCode = {
	[ErrorType.DATA_ERROR]: 400,
	[ErrorType.INTERNAL_ERROR]: 500,
	[ErrorType.UNKNOWN_ERROR]: 500,
	[ErrorType.NOT_FOUND]: 404
};

const response = (status, message = null) => {
	const data = {
		success: status
	};

	if (message) {
		data.message = message;
	}

	return data;
};

module.exports = {
	ErrorType,
	ErrorCode,
	response
};
