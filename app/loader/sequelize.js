const model = require('../model');
const logger = require('../util/logger');

module.exports = async () => {
	try {
		await model.sequelize.authenticate();
		logger.log('Connection with database estabished');
	} catch (e) {
		logger.error('Connection with database not estabished');
		process.exit(1);
	}
};
