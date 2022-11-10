process.env.NODE_ENV = 'test';

const chai = require('chai');

const {Vehicle, StateLog} = require('../../app/model');
const vehicleService = require('../../app/service/vehicle');
const {ErrorType} = require('../../app/util/response');

describe('Service: Vehicle', () => {
	let vehicle = null;

	describe('Method: fetchStateLog', () => {
		before(async () => {
			vehicle = await Vehicle.create({
				id: 99999, // no primary key in the model
				make: 'Test',
				model: 'Test',
				state: 'sold'
			});

			await StateLog.create({
				vehicleId: vehicle.id,
				state: 'quoted',
				timestamp: '2022-10-06 10:00:00+00'
			});

			await StateLog.create({
				vehicleId: vehicle.id,
				state: 'selling',
				timestamp: '2022-10-06 12:00:00+00'
			});

			await StateLog.create({
				vehicleId: vehicle.id,
				state: 'sold',
				timestamp: '2022-10-06 14:00:00+00'
			});
		});

		it('Fetch state with no timestamp', async () => {
			const response = await vehicleService.fetchStateLog(vehicle.id, null);

			chai.assert.equal(response.success, false);
			chai.assert.equal(response.message, ErrorType.NOT_FOUND);
		});

		it('Fetch state with no id', async () => {
			const testedTimestamp = '2022-10-06 11:00:00+00';

			const response = await vehicleService.fetchStateLog(null, testedTimestamp);

			chai.assert.equal(response.success, false);
			chai.assert.equal(response.message, ErrorType.NOT_FOUND);
		});

		it('Fetch state with string id', async () => {
			const testedTimestamp = '2022-10-06 11:00:00+00';

			const response = await vehicleService.fetchStateLog('string', testedTimestamp);

			chai.assert.equal(response.success, false);
			chai.assert.equal(response.message, ErrorType.INTERNAL_ERROR);
		});

		it('Fetch state with correct parameters for the previous state', async () => {
			const testedTimestamp = '2022-10-06 11:00:00+00';

			const response = await vehicleService.fetchStateLog(vehicle.id, testedTimestamp);

			chai.assert.equal(response.success, true);
			chai.assert.equal(response.message.vehicleId, vehicle.id);
			chai.assert.isAtMost(new Date(response.message.timestamp).getTime(), new Date(testedTimestamp).getTime());
			chai.assert.equal(response.message.state, 'quoted');
		});

		it('Fetch state with correct parameters for the previous state with custom timezone', async () => {
			const testedTimestamp = '2022-10-06 14:00:00+01';

			const response = await vehicleService.fetchStateLog(vehicle.id, testedTimestamp);

			chai.assert.equal(response.success, true);
			chai.assert.equal(response.message.vehicleId, vehicle.id);
			chai.assert.isAtMost(new Date(response.message.timestamp).getTime(), new Date(testedTimestamp).getTime());
			chai.assert.equal(response.message.state, 'selling');
		});

		it('Fetch state with correct parameters for the newest state', async () => {
			const testedTimestamp = '2022-10-06 18:00:00+00';

			const response = await vehicleService.fetchStateLog(vehicle.id, testedTimestamp);

			chai.assert.equal(response.success, true);
			chai.assert.equal(response.message.vehicleId, vehicle.id);
			chai.assert.isAtMost(new Date(response.message.timestamp).getTime(), new Date(testedTimestamp).getTime());
			chai.assert.equal(response.message.state, 'sold');
		});

		after(async () => {
			await StateLog.destroy({
				where: {
					vehicleId: vehicle.id
				}
			});

			await vehicle.destroy();
		});
	});

	describe('Method: fetchStateLog', () => {
		it('Fetch state with removed/not-existing ID', async () => {
			const testedTimestamp = '2022-10-06 14:00:00+01';

			const response = await vehicleService.fetchStateLog(vehicle.id, testedTimestamp);

			chai.assert.equal(response.success, false);
			chai.assert.equal(response.message, ErrorType.NOT_FOUND);
		});
	});
});
