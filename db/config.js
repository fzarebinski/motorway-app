require('dotenv').config();

const {
	DB_HOST,
	DB_USER,
	DB_PASSWORD,
	DB_NAME
} = process.env;

const config = {
	host: DB_HOST,
	username: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	dialect: 'postgres',
	timezone: '+00:00',
	define: {
		freezeTableName: true,
		createdAt: false,
		updatedAt: false
	},
	migrationStorageTableName: 'migration'
};

module.exports = {
	development: config,
	test: config,
	production: config
};
