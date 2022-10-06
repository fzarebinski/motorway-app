module.exports = (sequelize, Sequelize) => {
	const model = {
		table: null,
		relations: null
	};

	model.table = sequelize.define('stateLogs', {
		vehicleId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		state: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		timestamp: {
			type: Sequelize.DATE,
			allowNull: false
		}
	});

	model.table.removeAttribute('id'); // no primary key in the model
	model.relations = () => {}; // no foreign key in the model

	return model;
};
