const express = require('express');
const {param} = require('express-validator');

const {validate} = require('../util/validator');
const {response, ErrorCode} = require('../util/response');
const vehicleService = require('../service/vehicle');

const router = express.Router({mergeParams: true});

router.get('/:id/state/:timestamp', [
	param('id').isInt({min: 1}),
	param('timestamp').isISO8601().toDate()
], async (req, res) => {
	if (!validate(req, res)) return;

	const {id, timestamp} = req.params;

	const vehicleResponse = await vehicleService.fetchStateLog(id, timestamp);

	if (!vehicleResponse.success) {
		res
			.status(ErrorCode[vehicleResponse.message])
			.json(response(false, 'Fetching current status failed.'));

		return;
	}

	res.json(response(true, vehicleResponse.message.state));
});

module.exports = router;
