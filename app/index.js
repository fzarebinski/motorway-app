require('dotenv').config();
const cluster = require('cluster');
const express = require('express');
const os = require('os');

const loader = require('./loader');
const logger = require('./util/logger');

const start = async () => {
	const {NODE_ENV} = process.env;

	if (cluster.isMaster && NODE_ENV === 'production') {
		const workers = os.cpus().length;

		logger.log(`Preparing  ${workers} workers...`);

		for (let i = 0; i < workers; i += 1) {
			cluster.fork();
		}

		cluster.on('online', (worker) => {
			logger.log(`Worker ${worker.process.pid} is online`);
		});

		cluster.on('exit', (worker, code, signal) => {
			logger.error(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
			logger.log('Starting a new worker');
			cluster.fork();
		});
	} else {
		const app = express();
		await loader(app);

		app.listen(process.env.PORT, (err) => {
			if (err) {
				logger.log('Server running failed...');
				logger.error(err);
				return;
			}

			logger.log(`Server is listening on port ${process.env.PORT}`);
		});
	}
};

start();
