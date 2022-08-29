"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.editPerson = exports.createPerson = exports.getPersonById = exports.getPeople = void 0;
const { Person, Movie, Rol } = require("../db");
const getPeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        if (name) {
            let allPeople = yield Person.findOne({
                where: {
                    Name: name,
                },
                attributes: ["id", "Name", "LastName", "Age"],
                include: {
                    attributes: ["rolName"],
                    through: {
                        attributes: [],
                    },
                    model: Rol,
                    include: {
                        attributes: ["Title"],
                        through: {
                            attributes: [],
                        },
                        model: Movie,
                    },
                },
            });
            if (!allPeople) {
                return res.status(400).json({
                    mensaje: "Persona no encotrada",
                });
            }
            res.status(200).json({
                mensaje: "Persona encontrada!",
                Personas: allPeople,
            });
        }
        else if (!name) {
            let allPeople = yield Person.findAll({
                attributes: ["id", "Name", "LastName", "Age"],
                include: {
                    attributes: ["rolName"],
                    through: {
                        attributes: [],
                    },
                    model: Rol,
                    include: {
                        attributes: ["Title"],
                        through: {
                            attributes: [],
                        },
                        model: Movie,
                    },
                },
            });
            res.status(200).json({
                mensaje: "Todas las personas",
                Personas: allPeople,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Todo no ok" });
    }
});
exports.getPeople = getPeople;
const getPersonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !Number.isSafeInteger(Number(id))) {
            return res.status(400).json({ mensaje: "Debe colocar un id valido" });
        }
        let person = yield Person.findOne({
            where: {
                id,
            },
            attributes: ["id", "Name", "LastName", "Age"],
            include: {
                attributes: ["rolName"],
                through: {
                    attributes: [],
                },
                model: Rol,
                include: {
                    attributes: ["Title"],
                    through: {
                        attributes: [],
                    },
                    model: Movie,
                },
            },
        });
        if (!person) {
            return res.status(400).json({ mensaje: "La persona no existe" });
        }
        res.status(200).json({ mensaje: "Todo Ok", Persona: person });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Hubo un error" });
    }
});
exports.getPersonById = getPersonById;
const createPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, LastName, Age } = req.body;
        if (!Name || !LastName || !Age) {
            return res
                .status(400)
                .json({ mensaje: "Debe colocar Name, LastName y Age" });
        }
        let persona = yield Person.findOrCreate({
            where: {
                Name,
                LastName,
                Age,
            },
        });
        if (persona[1] === false) {
            return res.status(400).json({ mensaje: "Persona ya existe" });
        }
        res.status(200).json({
            mensaje: "Persona crada con exito!",
            persona,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Hubo un error" });
    }
});
exports.createPerson = createPerson;
const editPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        const { Name, LastName, Age } = req.body;
        if (!id || !Number.isSafeInteger(Number(id))) {
            return res.status(400).json({ mensaje: "Debe colocar un id valido" });
        }
        if (!Name || !LastName || !Age) {
            return res
                .status(400)
                .json({ mensaje: "Debe colocar un Name, LastName, Age valido" });
        }
        let editPerson = yield Movie.update({
            Name,
            LastName,
            Age,
        }, {
            where: {
                id,
            },
        });
        if (!editPerson) {
            return res.status(400).json({ mensaje: "La persona no existe" });
        }
        res.status(200).json({ mensaje: "Persona editada con exito", editPerson });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Hubo un error" });
    }
});
exports.editPerson = editPerson;
const deletePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !Number.isSafeInteger(Number(id))) {
            return res.status(400).json({ mensaje: "Debe colocar un id valido" });
        }
        let movieDeleted = yield Person.destroy({
            where: {
                id: id,
            },
        });
        if (!movieDeleted) {
            return res.status(400).json({ mensaje: "La Persona no existe" });
        }
        res.status(200).json({
            mensaje: "Persona eliminada correctamente",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Hubo un error" });
    }
});
exports.deletePerson = deletePerson;
