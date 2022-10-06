require('dotenv').config();
const cluster = require('cluster');
const express = require('express');
const os = require('os');

const loader = require('./loader');

const start = async () => {
	const {NODE_ENV} = process.env;

	if (cluster.isMaster && NODE_ENV === 'production') {
		const workers = os.cpus().length;

		console.log(`Preparing  ${workers} workers...`);

		for (let i = 0; i < workers; i += 1) {
			cluster.fork();
		}

		cluster.on('online', (worker) => {
			console.log(`Worker ${worker.process.pid} is online`);
		});

		cluster.on('exit', (worker, code, signal) => {
			console.error(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
			console.log('Starting a new worker');
			cluster.fork();
		});
	} else {
		const app = express();
		await loader(app);

		app.listen(process.env.PORT, (err) => {
			if (err) {
				console.log('Server running failed...');
				console.error(err); // eslint-disable-line
				return;
			}

			console.log(`Server is listening on port ${process.env.PORT}`); // eslint-disable-line
		});
	}
};

start();
