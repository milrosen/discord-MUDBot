const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix} = require('./config')


// keep BOT_TOKEN in its own file and also on Heroku
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log('not in production')
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if(message.content.startsWith(`${prefix}beep`)) {
		message.channel.send('boop')
	}
});

client.login(process.env.BOT_TOKEN);
