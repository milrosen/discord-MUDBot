module.exports = {
	name: 'info',
	description: 'calls the info method in other commands',
	execute: async ({ message, args }, ...rest) => {
		const commands = rest[0];
		if (args[0]) {
			if (commands.has(args[0])) {
				const command = commands.get(args[0]);
				if (Object.hasOwnProperty.call(command, 'info')) command.info({ 'message': message, 'args': args });
				else message.channel.send(command.description);
			}
			if (Object.prototype.hasOwnProperty.call(this, args[0])) {
				try {
					this[args[0]]({ 'message': message, 'args': args });
				}
				catch {
					message.channel.send('there was an error with this info command, try using info with no arguments instead');
				}
			}
		}
		else {
			let str = 'Commands:\n';
			commands.forEach(cmd => {
				str += `	${cmd.name}: ${cmd.description}\n`;
			});
			message.channel.send(str);
		}
	},
	defaultInfo: async ({ message }) => {
		message.channel.send('info with argument `defaultinfo`');
	},
};