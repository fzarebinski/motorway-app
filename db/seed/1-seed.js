'use strict';

const db = require('../../app/model');

module.exports = {
	up: async () => {
		await db.sequelize.sync({force: true});
	},
	down: async () => {
		await db.sequelize.drop();
	}
};
