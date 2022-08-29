"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("person", {
        Name: {
            type: sequelize_1.DataTypes.STRING,
        },
        LastName: {
            type: sequelize_1.DataTypes.STRING,
        },
        Age: {
            type: sequelize_1.DataTypes.INTEGER,
        },
    });
};
