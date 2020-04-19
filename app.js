// require/setup external stuff
const Discord = require('discord.js');
const clientDs = new Discord.Client();
clientDs.commands = new Discord.Collection();
const PostgreSQL = require('pg');
const clientPg = new PostgreSQL.Client({
	connectionString: process.env.DATABASE_URL,
	ssl: true,
});
const fs = require('fs');

// require/setup stuff I've written
const { prefix } = require('./config');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// keep env variables local for easier testing
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
	console.log('not in production');
}

// initialize heroku PostgreSQL
clientPg.connect();

// discord section
clientDs.once('ready', () => {
	console.log('Ready!');
});

// command handler
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	clientDs.commands.set(command.name, command);
}

clientDs.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!clientDs.commands.has(command)) return;

	try {
		clientDs.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

clientDs.login(process.env.BOT_TOKEN);
