"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("rol", {
        RolName: {
            type: sequelize_1.DataTypes.STRING,
        },
        Movie: {
            type: sequelize_1.DataTypes.STRING,
        },
    });
};
