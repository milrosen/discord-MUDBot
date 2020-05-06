module.exports = {
	name: 'createcharacter',
	description: 'creates a character',
	cooldown: 3,
	cooldownMessage: (timeLeft) => {
		return `sorry, you can only create a maximum of one character per hour
		please wait another ${Math.floor(timeLeft.toFixed(1) / 60 + 1)} minute(s) before reusing the \`createcharacter\` command`;
	},
	execute: async ({ message }) => {
		message.reply(' now starting character creation!');
		const responses = new Map([[message.author.id, '']]);
		return responses.set(message.author.id, new Map([['response1', response1], ['response2', async ({ message }) => {
			message.channel.send('response2');
		}]]));
	},
	info: async ({ message, args }) => {
		message.channel.send(`you asked for info about ${args[0]}`);
	},
};
const response1 = async ({ message }) => {
	message.channel.send('response1');
	const responses = new Map([[message.author.id, '']]);
	return responses.set(message.author.id, new Map([['response1', response1], ['response2', async ({ message }) => {
		message.channel.send('response2');
	}]]));
};