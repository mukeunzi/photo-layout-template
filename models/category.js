"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class category extends Model {
		static associate(models) {}
	}
	category.init(
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: "BINARY(16)",
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			visible: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: "category",
			underscored: true,
			freezeTableName: true,
			timestamps: true,
		}
	);
	return category;
};
