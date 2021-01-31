"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("template", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: "BINARY(16)",
			},
			name: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			thumbnailUrl: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				field: "thumbnail_url",
			},
			assetUrl: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				field: "asset_url",
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

		await queryInterface.addColumn("template", "category_id", {
			type: "BINARY(16)",
			references: {
				model: "category",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("template");
	},
};
