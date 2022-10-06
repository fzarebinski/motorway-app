const sequelize = require('./sequelize');
const express = require('./express');

module.exports = async (app) => {
	await sequelize();
	express(app);
};
