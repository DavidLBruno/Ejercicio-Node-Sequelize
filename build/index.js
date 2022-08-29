"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
require("dotenv").config();
const { conn } = require("./src/db");
const PORT = process.env.PORT || 3001;
conn.sync({ force: true }).then(() => {
    app_1.default.listen(PORT, () => {
        console.log("Server listen at " + PORT);
    });
});