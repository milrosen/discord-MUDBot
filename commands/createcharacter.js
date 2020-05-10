const creatingCharacter = new Map();
const { prefix } = require('../config');
const raceInfo = require('../Info/races.json');
const { Character } = require('../character');
const { User } = require('../user');

module.exports = {
	name: 'createcharacter',
	description: 'creates a character',
	cooldown: 3,
	cooldownMessage: (timeLeft) => {
		return `sorry, you can only create a maximum of one character per hour
		please wait another ${Math.floor(timeLeft.toFixed(1) / 60 + 1)} minute(s) before reusing the \`createcharacter\` command`;
	},
	execute: async ({ message, sequelize }) => {
		Character.initialize(sequelize);
		const user = await User.findOne({ where: { playerId: message.author.id } });
		if (creatingCharacter.has(message.author.id)) {
			message.reply('you are in the process of creating a character, would you like to `startover` or `resume`');
			return formatResponses(message.author.id, ['resume', resume], ['startover', startover]);
		}
		if (user.canCreateCharacter) {
			message.reply('you cannot create a character right now');
		}
		else {
			creatingCharacter.set(message.author.id, 'race');
			await Character.create({ playerId: message.author.id });
			return chooseRace({ 'message': message });
		}
	},
	info: async ({ message, args }) => {
		message.channel.send(`you asked for info about ${args[0]}`);
	},
};

const resume = async ({ message }) => {
	const progress = creatingCharacter.get(message.author.id);
	if (progress === 'race') return chooseRace({ 'message': message });
	if (progress === 'name') return chooseName({ 'message': message });
	if (progress === 'class') return chooseClass({ 'message': message });
};

const startover = async () => {
	// write me please
};

const chooseRace = ({ message }) => {
	message.reply('First, choose your characters race. You have a choice between Dwarves, Elves, Humans or Halflings. Use `!info Dwarf` to find out more about Dwarves, for example.\n When you\'re ready, please respond with `!Dwarf`, `!Elf`, `!Human`, or `!Halfling`');
	return formatResponses(message.author.id, ['dwarf', setRace], ['elf', setRace], ['human', setRace], ['halfling', setRace]);
};

const setRace = async ({ message }) => {
	const { commandName } = messageToCommandAndArgs(message);
	if (!/dwarf|elf|halfling|human/.test(commandName)) return;

	const character = await Character.findOne({ where: { playerId: message.author.id } });
	if (character === null) return;
	const race = raceInfo[commandName];
	await character.update({
		'race': race.name,
		'speed': race.speed,
		'itemProficiencies': Object.assign({}, race.proficiencies.weapons, race.proficiencies.tools),
		'featuresTraitsSpells': race['extra abilities'],
		'abilityScores': race['ability score increase'],
	});
	creatingCharacter.set(message.author.id, 'name');
	return chooseName({ 'message': message });
};

const chooseName = async ({ message }) => {
	const character = await Character.findOne({ where: { playerId: message.author.id } });
	message.reply(`Now you may choose your character's name. It can be anything you like, but some sample names for ${raceInfo[character.race].plural} are: 
${raceInfo[character.race].sampleNames.join(' ')}
please respond with \`!name\` followed by the name for your character or \`!random\` for a random name from the list`);
	return formatResponses(message.author.id, ['name', setName], ['random', setName]);
};

const setName = async ({ message }) => {
	const { commandName, args } = messageToCommandAndArgs(message);
	if (!/name|random/.test(commandName)) return;
	const character = await Character.findOne({ where: { playerId: message.author.id } });
	if (character === null) return;
	if (commandName === 'random') {
		const namesArray = raceInfo[character.race].sampleNames;
		character.update({ name: namesArray[Math.floor(Math.random() * namesArray.length)] });
		return;
	}
	if (!args[0]) {
		return chooseName({ 'message': message });
	}
	character.update({ name: args.join(' ') });
	creatingCharacter.set(message.author.id, 'class');
	return chooseClass({ message });
};

const chooseClass = async ({ message }) => {
	// return formatResponses(message.author.id, ['name', setClass]);
};

const setClass = async ({ message }) => {
	// no empty block
};


// helper functions

const formatResponses = (id, ...rest) => {
	return new Map([[id, new Map(rest)]]);
};

const messageToCommandAndArgs = (message) => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	return { 'args': args, 'commandName': commandName };
};
