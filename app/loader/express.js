const express = require('express');
const bodyParser = require('body-parser');

const api = require('../api');

module.exports = (app) => {
	app.use(bodyParser.json({
		limit: '10mb',
		verify: (req, res, buf) => {
			req.rawBody = buf;
		}
	}));

	app.use(express.json());

	api(app);
};
