const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix} = require('./config')

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if(message.content.startsWith(`${prefix}ping`)) {
		message.channel.send('Pong')
	}
});

client.login(process.env.BOT_TOKEN);
