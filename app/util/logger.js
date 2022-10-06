const debug = require('debug');

const log = debug('app:log');
const warning = debug('app:warning');
const error = debug('app:error');

module.exports = {
	log: (message) => log('%o', message),
	warning: (message) => warning('%o', message),
	error: (message) => error('%o', message)
};
