import { DataTypes, Model } from 'sequelize';
import { Character } from './character';

export class User extends Model {
	playerId: string
	creatingCharacter: number
	getCharacters: Function
	static initialize(sequelize): void {
		User.init({
			playerId: DataTypes.STRING,
			creatingCharacter: DataTypes.INTEGER,
		}, {
			sequelize,
			modelName: 'User',
		});
		Character.initialize(sequelize);
		User.hasMany(Character);
	}
	async getCurrentCharacter(): Promise<Character> {
		return await this.getCharacters({ where: { id: this.creatingCharacter } });
	}
}