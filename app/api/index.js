const express = require('express');

const vehicleApi = require('./vehicle');

module.exports = (app) => {
	const router = express.Router();

	router.use('/vehicle', vehicleApi);

	app.use(router);
};
