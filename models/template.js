"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class template extends Model {
		static associate(models) {
			models.template.belongsTo(models.category, { as: "categoryId", foreignKey: "category_id" });
		}
	}
	template.init(
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
			thumbnailUrl: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			assetUrl: {
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
			modelName: "template",
			underscored: true,
			freezeTableName: true,
			timestamps: true,
		}
	);
	return template;
};
