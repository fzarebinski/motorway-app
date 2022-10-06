process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {Vehicle, StateLog} = require('../../app/model');
const app = require('../../app');

chai.use(chaiHttp);

describe('API: Vehicle', () => {
	let vehicle = null;

	describe('Endpoint: /vehicle/:id/state/:timestamp', () => {
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

		it('Fetch state with string ID', (done) => {
			chai.request(app)
				.get('/vehicle/str/state/2022-09-12 13:00:00+00')
				.end((err, res) => {
					chai.assert.equal(res.status, 400);
					chai.assert.equal(res.body.success, false);
					done();
				});
		});

		it('Fetch state with negative ID', (done) => {
			chai.request(app)
				.get('/vehicle/-1/state/2022-09-12 13:00:00+00')
				.end((err, res) => {
					chai.assert.equal(res.status, 400);
					chai.assert.equal(res.body.success, false);
					done();
				});
		});

		it('Fetch state with string date', (done) => {
			chai.request(app)
				.get(`/vehicle/${vehicle.id}/state/string`)
				.end((err, res) => {
					chai.assert.equal(res.status, 400);
					chai.assert.equal(res.body.success, false);
					done();
				});
		});

		it('Fetch state with empty date', (done) => {
			chai.request(app)
				.get(`/vehicle/${vehicle.id}/state/`)
				.end((err, res) => {
					chai.assert.equal(res.status, 404);
					done();
				});
		});

		it('Fetch state with correct parameters for the previous state', (done) => {
			const testedTimestamp = '2022-10-06 11:00:00+00';

			chai.request(app)
				.get(`/vehicle/${vehicle.id}/state/${testedTimestamp}`)
				.end((err, res) => {
					chai.assert.equal(res.status, 200);
					chai.assert.equal(res.body.success, true);
					chai.assert.equal(res.body.message, 'quoted');
					done();
				});
		});

		it('Fetch state with correct parameters for the previous state and with custom timezone', (done) => {
			const testedTimestamp = '2022-10-06 14:00:00+01';

			chai.request(app)
				.get(`/vehicle/${vehicle.id}/state/${testedTimestamp}`)
				.end((err, res) => {
					chai.assert.equal(res.status, 200);
					chai.assert.equal(res.body.success, true);
					chai.assert.equal(res.body.message, 'selling');
					done();
				});
		});

		it('Fetch state with correct parameters for the newest state', (done) => {
			const testedTimestamp = '2022-10-06 18:00:00+00';

			chai.request(app)
				.get(`/vehicle/${vehicle.id}/state/${testedTimestamp}`)
				.end((err, res) => {
					chai.assert.equal(res.status, 200);
					chai.assert.equal(res.body.success, true);
					chai.assert.equal(res.body.message, 'sold');
					done();
				});
		});

		after(async () => {
			await StateLog.destroy({
				where: {
					vehicleId: vehicle.id
				}
			})

			await vehicle.destroy();
		});
	});

	describe('Endpoint: /vehicle/:id/state/:timestamp', () => {
		it('Fetch state with removed ID', (done) => {
			const testedTimestamp = '2022-10-06 14:00:00+01';

			chai.request(app)
				.get(`/vehicle/${vehicle.id}/state/${testedTimestamp}`)
				.end((err, res) => {
					chai.assert.equal(res.status, 404);
					chai.assert.equal(res.body.success, false);
					done();
				});
		});
	});
});
