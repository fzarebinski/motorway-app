module.exports = (sequelize, Sequelize) => {
	const model = {
		table: null,
		relations: null
	};

	model.table = sequelize.define('vehicles', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		make: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		model: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		state: {
			type: Sequelize.TEXT,
			allowNull: false
		}
	});

	model.relations = () => {}; // no foreign key in the model

	return model;
};
