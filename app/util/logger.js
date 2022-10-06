const debug = require('debug');

const log = debug('app:log');
const warning = debug('app:warning');
const error = debug('app:error');

module.exports = {
	log: (message) => log('%O', message),
	warning: (message) => warning('%O', message),
	error: (message) => error('%O', message)
};
