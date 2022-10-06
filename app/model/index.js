require('dotenv').config();
const Sequelize = require('sequelize');

const {production: config} = require('../../db/config');
const {log} = require('../util/logger');

const db = {};

const sequelize = new Sequelize({
	...config,
	logging: log
});

// Sequelize

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Init tables

const Vehicle = require('./Vehicle')(sequelize, Sequelize);
const StateLog = require('./StateLog')(sequelize, Sequelize);

db.Vehicle = Vehicle.table;
db.StateLog = StateLog.table;

Vehicle.relations(db);
StateLog.relations(db);

module.exports = db;
