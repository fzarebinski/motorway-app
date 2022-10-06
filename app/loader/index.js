const sequelize = require('./sequelize');
const express = require('./express');

module.exports = (app) => {
	sequelize();
	express(app);
};
