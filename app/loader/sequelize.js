const model = require('../model');
const logger = require('../util/logger');

module.exports = async () => {
	try {
		await model.sequelize.authenticate();
		logger.log('Connection with database established');
	} catch (e) {
		logger.error('Connection with database not established');
		process.exit(1);
	}
};
