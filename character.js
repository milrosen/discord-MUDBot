"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Character extends sequelize_1.Model {
    static initialize(sequelize) {
        Character.init({
            name: sequelize_1.DataTypes.STRING,
            race: sequelize_1.DataTypes.STRING,
            class: sequelize_1.DataTypes.STRING,
            level: sequelize_1.DataTypes.INTEGER,
            xp: sequelize_1.DataTypes.INTEGER,
            gender: sequelize_1.DataTypes.STRING,
            age: sequelize_1.DataTypes.INTEGER,
            speed: sequelize_1.DataTypes.INTEGER,
            description: sequelize_1.DataTypes.STRING,
            attacks: sequelize_1.DataTypes.JSONB,
            hp: sequelize_1.DataTypes.JSONB,
            itemProficiencies: sequelize_1.DataTypes.JSONB,
            featuresTraitsSpells: sequelize_1.DataTypes.JSONB,
            inventory: sequelize_1.DataTypes.JSONB,
            abilityScores: sequelize_1.DataTypes.JSONB,
        }, {
            sequelize,
            modelName: 'Character',
        });
    }
}
exports.Character = Character;
