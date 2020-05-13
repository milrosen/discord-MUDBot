"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const character_1 = require("./character");
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        User.init({
            playerId: sequelize_1.DataTypes.STRING,
            creatingCharacter: sequelize_1.DataTypes.INTEGER,
        }, {
            sequelize,
            modelName: 'User',
        });
        character_1.Character.initialize(sequelize);
        User.hasMany(character_1.Character);
    }
    async getCurrentCharacter() {
        return await this.getCharacters({ where: { id: this.creatingCharacter } });
    }
}
exports.User = User;
