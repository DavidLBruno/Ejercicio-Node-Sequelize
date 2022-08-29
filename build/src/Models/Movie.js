"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("movie", {
        Title: {
            type: sequelize_1.DataTypes.STRING,
        },
        Year: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
};
