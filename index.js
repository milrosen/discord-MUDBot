const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix} = require('./config')

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if(message.content.startsWith(`${prefix}beep`)) {
		message.channel.send('boop')
	}
});

client.login(process.env.BOT_TOKEN);
