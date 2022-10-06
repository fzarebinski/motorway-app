process.env.NODE_ENV = 'test';

const chai = require('chai');

const {response, ErrorCode} = require("../../app/util/response");

describe('Util: Response', () => {
	describe('Method: response', () => {
		it('Generate success response without message', () => {
			const object = response(true);

			chai.assert.equal(object.success, true);
			chai.assert.isUndefined(object.message);
		});

		it('Generate success response with a message', () => {
			const object = response(true, 'Some message');

			chai.assert.equal(object.success, true);
			chai.assert.equal(object.message, 'Some message');
		});

		it('Generate failure response without message', () => {
			const object = response(false);

			chai.assert.equal(object.success, false);
			chai.assert.isUndefined(object.message);
		});

		it('Generate failure response with a message', () => {
			const object = response(false, 'Some message');

			chai.assert.equal(object.success, false);
			chai.assert.equal(object.message, 'Some message');
		});
	});

	describe('Object: ErrorCode', () => {
		it('Error code equals number', () => {
			Object.values(ErrorCode).forEach((code) => {
				chai.assert.isNumber(code);
			})
		});
	});
});
