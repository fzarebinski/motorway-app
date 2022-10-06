const model = require('../model');

module.exports = async () => {
	try {
		await model.sequelize.authenticate();
		console.log('Connection with database estabished');
	} catch (e) {
		console.error('Connection with database not estabished');
		process.exit(1);
	}
};
