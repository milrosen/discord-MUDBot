// require/setup external stuff
import Discord = require('discord.js');
const clientDs = new Discord.Client();
import fs = require('fs');
// require/setup stuff I've written
import { prefix } from './config.json';
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
import { Command } from './Namespace';

// keep env variables local for easier testing
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
	console.log('not in production');
}

// initialize Sequelize
import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(process.env.DATABASE_URL);

// discord section
interface ClientDsWithCommandsCollection extends Discord.Client {
	commands?: Map<string, Function>;

}
const cooldowns = new Discord.Collection() as Discord.Collection<string, Discord.Collection<string, number>>;
const commands = new Discord.Collection() as Discord.Collection<string, Command> ;

let responses = new Map();

clientDs.once('ready', () => {
	console.log('Ready!');
});

// command handler
async function commandHandler(): Promise<void> {
	for (const file of commandFiles) {
		const command: Command = await import(`./commands/${file}`);

		// set a new item in the Collection
		// with the key as the command name and the value as the exported module
		commands.set(command.name, command);
	}
}
commandHandler();

clientDs.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!commands.has(commandName)) {
		// check for responses
		if (responses.has(message.author.id) && responses.get(message.author.id).has(commandName)) {
			responses.get(message.author.id).get(commandName)({ 'message': message, 'args': args, 'sequelize': sequelize })
				.then((response) => {
					if (response) responses = new Map([...responses, ...response]);
				})
				.catch(console.log);
			responses.delete(message.author.id);
		}
		return;
	}
	const command = commands.get(commandName);

	// cooldowns
	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply((typeof (command['cooldownMessage']) === 'function') ? command.cooldownMessage(timeLeft) : `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// execute command
	try {
		// handles pseudocommands, lets users call other methods of a command only after they run the first execute method in a command
		command.execute({ 'message': message, 'args': args, 'sequelize': sequelize }, commands)
		// if the command returns a response, add id to the responses map
			.then((response) => {
				if (response) responses = new Map([...responses, ...response]);
			})
			.catch(console.log);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

clientDs.login(process.env.BOT_TOKEN);
