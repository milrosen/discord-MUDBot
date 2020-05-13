"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
module.exports = {
    name: 'start',
    description: 'begins the game, call before anything else',
    execute: async ({ message, sequelize }) => {
        user_1.User.initialize(sequelize);
        const user = await user_1.User.findOne({ where: { playerId: message.author.id } });
        if (user !== null)
            return;
        await user_1.User.create({ playerId: message.author.id });
    },
};
