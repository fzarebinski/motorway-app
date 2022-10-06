process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.use(chaiHttp);

describe('API: Vehicle', () => {
	describe('Endpoint: /vehicle/:id/state/:timestamp', () => {
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
				.get('/vehicle/1/state/string')
				.end((err, res) => {
					chai.assert.equal(res.status, 400);
					chai.assert.equal(res.body.success, false);
					done();
				});
		});
	});
});
