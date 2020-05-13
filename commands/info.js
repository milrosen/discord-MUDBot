"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raceInfo = require("../Info/races.json");
module.exports = {
    name: 'info',
    description: 'calls the info method in other commands',
    execute: async ({ message, args }, ...rest) => {
        const commands = rest[0];
        if (args[0]) {
            const infoRequest = args[0];
            if (commands.has(infoRequest)) {
                const command = commands.get(infoRequest);
                if (({}).hasOwnProperty.call(command, 'info'))
                    command.info({ 'message': message, 'args': args });
                else
                    message.channel.send(command.description);
                return;
            }
            if (/Dwarf|Elf|Halfling|Human/i.test(infoRequest)) {
                let abilities;
                const race = raceInfo[infoRequest.toString().toLowerCase()];
                if (race.extra_abilities)
                    race.extra_abilities.forEach(ability => abilities += `${ability.name}: ${ability.description}\n`);
                message.channel.send((`${race.description}\n
				they are considered adults at ${race.age.young} and typically live to about ${race.age.lifespan}
				their allignment is usually ${race.alignment}, and are on average ${race.size.height} feet tall and weigh ${race.size.weight} pounds
				they can move ${race.speed} feet per turn, they speak ${race.language[0]} and ${race.language[1]}
				${(race.proficiencies && race.proficiencies.weapons) ? `${race.plural} are proficient with ${race.proficiencies.weapons.join('s, ')}s\n` : ''}
				${abilities ? abilities.replace('undefined', '') : ''}`)
                    .replace(/\t/gm, ''));
                return;
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
};
