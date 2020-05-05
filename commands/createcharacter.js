module.exports = {
	name: 'createcharacter',
	description: 'creates a character',
	cooldown: 3,
	cooldownMessage: (timeLeft) => {
		return `sorry, you can only create a maximum of one character per hour
		please wait another ${Math.floor(timeLeft.toFixed(1) / 60 + 1)} minute(s) before reusing the \`createcharacter\` command`;
	},
	execute: async ({ msg }) => {
		msg.reply(' now starting character creation!');
		const pseudoCommandInfo = new Map([[msg.author.id, 'createcharacter']]);
		return new Map([ ['pseudocommand1', pseudoCommandInfo], ['pseudocommand2', pseudoCommandInfo ]]);
	},
	pseudocommand1: async ({ msg }) => {
		msg.channel.send('pseudocommand1');
		const pseudoCommandInfo = new Map([[msg.author.id, 'createcharacter']]);
		return new Map([['pseudocommand2', pseudoCommandInfo ]]);
	},
	pseudocommand2: async ({ msg }) => {
		msg.channel.send('pseudocommand2');
	},
	info: async ({ msg, arg }) => {
		msg.channel.send(`you asked for info about ${arg[0]}`);
	},
};