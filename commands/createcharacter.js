module.exports = {
	name: 'createcharacter',
	description: 'creates a character',
	cooldown: 3,
	execute(message) {
		message.reply(' now starting character creation!');
		const pseudoCommandInfo = [message.author.id, 'createcharacter'];
		return new Map([ ['pseudocommand1', new Map([pseudoCommandInfo])], ['pseudocommand2', new Map([pseudoCommandInfo])] ]);
	},
	cooldownMessage: (timeLeft) => {
		return `sorry, you can only create a maximum of one character per hour
		please wait another ${Math.floor(timeLeft.toFixed(1) / 60 + 1)} minute(s) before reusing the \`createcharacter\` command`;
	},
	pseudocommand1: (message) => {
		message.channel.send('pseudocommand1');
	},
	pseudocommand2: (message) => {
		message.channel.send('pseudocommand2');
	},
};