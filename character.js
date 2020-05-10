const { DataTypes, Model } = require('sequelize');

class Character extends Model {
	static initialize(sequelize) {
		Character.init({
			name: DataTypes.STRING,
			race: DataTypes.STRING,
			class: DataTypes.STRING,
			level: DataTypes.INTEGER,
			xp: DataTypes.INTEGER,
			gender: DataTypes.STRING,
			age: DataTypes.INTEGER,
			speed: DataTypes.INTEGER,
			description: DataTypes.STRING,
			attacks: DataTypes.JSONB,
			hp: DataTypes.JSONB,
			itemProficiencies: DataTypes.JSONB,
			featuresTraitsSpells: DataTypes.JSONB,
			inventory: DataTypes.JSONB,
			abilityScores: DataTypes.JSONB,
		}, {
			sequelize,
			modelName: 'Character',
		});
	}
}
module.exports = {
	'Character': Character,
};