import { User } from '../user';

module.exports = {
	name: 'start',
	description: 'begins the game, call before anything else',
	execute: async ({ message, sequelize }): Promise<void> => {
		User.initialize(sequelize);
		const user = await User.findOne({ where: { playerId: message.author.id } });
		if (user !== null) return;
		await User.create({ playerId: message.author.id });
	},
};