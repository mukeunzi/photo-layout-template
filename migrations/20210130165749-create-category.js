"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("category", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: "BINARY(16)",
			},
			name: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			visible: {
				allowNull: false,
				type: Sequelize.DataTypes.BOOLEAN,
				defaultValue: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: "created_at",
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: "updated_at",
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("category");
	},
};
