const {Op} = require('sequelize');

const {StateLog} = require('../model');
const {response, ErrorType} = require('../util/response');

const fetchStateLog = async (id, timestamp) => {
	try {
		const stateLog = await StateLog.findOne({
			where: {
				vehicleId: id,
				timestamp: {
					[Op.lt]: timestamp
				}
			},
			order: [
				['timestamp', 'DESC']
			]
		});

		if (!stateLog) {
			return response(false, ErrorType.NOT_FOUND);
		}

		return response(true, stateLog);
	} catch (e) {
		console.error(e);

		return response(false, ErrorType.INTERNAL_ERROR);
	}
};

module.exports = {
	fetchStateLog
};
