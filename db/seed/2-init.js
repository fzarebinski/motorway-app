'use strict';

module.exports = {
	up: async (queryInterface) => {
		/*
		await queryInterface.bulkInsert('migration', [{
			name: '00000000000000-some-migration.js'
		}]);
		*/
	},
	down: async (queryInterface, Sequelize) => {
		/*
		await queryInterface.bulkDelete('migration', {
			[Sequelize.Op.or]: [{
				name: '00000000000000-some-migration.js'
			}]
		});
		*/
	}
};
