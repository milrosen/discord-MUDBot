// minimum required for a command: name, description, and async execute function
// optional:
// cooldownMessage: function, returns spesific info or other stuff, like in createcharacter where it checks if the user has a character already
// cooldown: value, number of seconds that it takes to cooldown, default of 3
// info: function, requests information about a function, default reads the description of the command.

module.exports = {
	name: 'beep',
	description: 'Beep!',
	execute: async ({ message, args }) => {
		message.channel.send(`Boop ${args}`);
	},
};