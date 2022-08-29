"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, STATE } = process.env;
const Sequelize = require("sequelize");
const sequelize = STATE === "LOCAL"
    ? new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
        logging: false,
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
        logging: false,
        native: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    });
const basename = path_1.default.basename(__filename);
const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs_1.default.readdirSync(path_1.default.join(__dirname, "/models"))
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
    .forEach((file) => {
    modelDefiners.push(require(path_1.default.join(__dirname, "/models", file)));
});
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Person, Movie, Rol } = sequelize.models;
// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Person.hasMany(Rol, {
    foreignKey: "personId",
});
Rol.belongsToMany(Person, { through: "Rol_Person" });
Person.belongsToMany(Rol, { through: "Rol_Person" });
Movie.hasMany(Rol, {
    foreignKey: "movieId",
});
Rol.belongsToMany(Movie, { through: "Rol_Movie" });
Movie.belongsToMany(Rol, { through: "Rol_Movie" });
module.exports = Object.assign(Object.assign({}, sequelize.models), { conn: sequelize });
