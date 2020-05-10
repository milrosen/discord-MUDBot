const { DataTypes, Model } = require('sequelize');
const { Character } = require('./character');

class User extends Model {
	static initialize(sequelize) {
		User.init({
			playerId: DataTypes.STRING,
			numCharacters: DataTypes.INTEGER,
		}, {
			sequelize,
			modelName: 'User',
		});
		Character.initialize(sequelize);
		User.hasMany(Character);
	}
	currentCharacter
}
module.exports = {
	'User': User,
};