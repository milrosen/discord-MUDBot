module.exports = {
	name: 'info',
	description: 'calls the info method in other commands',
	execute: async ({ msg, arg }, ...rest) => {
		const commands = rest[0];
		if (arg[0]) {
			if (commands.has(arg[0])) {
				const command = commands.get(arg[0]);
				if (Object.hasOwnProperty.call(command, 'info')) command.info({ 'msg': msg, 'arg': arg });
				else msg.channel.send(command.description);
			}
			if (Object.prototype.hasOwnProperty.call(this, arg[0])) {
				try {
					this[arg[0]]({ 'msg': msg, 'arg': arg });
				}
				catch {
					msg.channel.send('there was an error with this info command, try using info with no arguments instead');
				}
			}
		}
		else {
			let str = 'Commands:\n';
			commands.forEach(cmd => {
				str += `	${cmd.name}: ${cmd.description}\n`;
			});
			msg.channel.send(str);
		}
	},
	defaultInfo: async ({ msg }) => {
		msg.channel.send('info with argument `defaultinfo`');
	},
};