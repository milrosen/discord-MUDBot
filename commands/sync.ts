module.exports = {
	name: 'sync',
	description: 'admin only',
	execute: async ({ message, sequelize }): Promise<void> => {
		if (message.author.id !== '325316296390737920') return;
		sequelize.sync({ force: true });
	},
};