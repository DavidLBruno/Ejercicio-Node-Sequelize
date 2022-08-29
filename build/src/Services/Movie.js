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
exports.deleteMovie = exports.editMovie = exports.createMovie = exports.getMovieById = exports.getMovies = void 0;
const { Person, Movie, Rol } = require("../db");
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        if (name) {
            let allMovies = yield Movie.findOne({
                where: {
                    Title: name,
                },
                attributes: ["id", "Title", "Year"],
                include: {
                    model: Rol,
                    attributes: ["rolName"],
                    through: {
                        attributes: [],
                    },
                    include: {
                        model: Person,
                        attributes: ["Name", "LastName"],
                        through: {
                            attributes: [],
                        },
                    },
                },
            });
            if (!allMovies) {
                return res.status(400).json({
                    mensaje: "La pelicula no existe",
                });
            }
            res.status(200).json({
                mensaje: "Pelicula encontrada!",
                peliculas: allMovies,
            });
        }
        else if (!name) {
            let allMovies = yield Movie.findAll({
                attributes: ["id", "Title", "Year"],
                include: {
                    model: Rol,
                    attributes: ["rolName"],
                    group: "rolName",
                    through: {
                        attributes: [],
                    },
                    include: {
                        model: Person,
                        attributes: ["Name", "LastName"],
                        through: {
                            attributes: [],
                        },
                    },
                },
            });
            res.status(200).json({
                mensaje: "Todas las Peliculas!",
                peliculas: allMovies,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Ha ocurrido un error" });
    }
});
exports.getMovies = getMovies;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !Number.isSafeInteger(Number(id))) {
            return res.status(400).json({ mensaje: "Debe colocar un id valido" });
        }
        let movie = yield Movie.findOne({
            where: {
                id,
            },
            attributes: ["id", "Title", "Year"],
            include: {
                model: Rol,
                attributes: ["rolName"],
                through: {
                    attributes: [],
                },
                include: {
                    model: Person,
                    attributes: ["Name", "LastName"],
                    through: {
                        attributes: [],
                    },
                },
            },
        });
        if (!movie) {
            return res.status(400).json({ mensaje: "La pelicula no existe" });
        }
        res.status(200).json({ mensaje: "Todo Ok", Movie: movie });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Hubo un error" });
    }
});
exports.getMovieById = getMovieById;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Title, Year, Casting, Directors, Producers } = req.body;
        const parameterCasting = Casting.map((element) => element.split(" "));
        const parameterDirector = Directors.map((element) => element.split(" "));
        const parameterProducer = Producers.map((element) => element.split(" "));
        let newMovie = yield Movie.create({
            Title,
            Year,
        });
        if (Casting) {
            parameterCasting.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                let personCasting = yield Person.findOne({
                    where: {
                        Name: element[0],
                        LastName: element[1] + `${element[2] ? " " + element[2] : ""}`,
                    },
                });
                let casting = yield Rol.create({
                    rolName: "Casting",
                });
                if (!personCasting) {
                    return res
                        .status(400)
                        .json({ mensaje: "Primero debe crear a las Personas" });
                }
                newMovie.addRols(casting);
                personCasting.addRols(casting);
                casting.addPeople(personCasting);
                casting.addMovie(newMovie);
            }));
        }
        if (Directors) {
            parameterDirector.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                let personCasting = yield Person.findOne({
                    where: {
                        Name: element[0],
                        LastName: element[1] + `${element[2] ? " " + element[2] : ""}`,
                    },
                });
                let directors = yield Rol.create({
                    rolName: "Directors",
                });
                if (!personCasting) {
                    return res
                        .status(400)
                        .json({ mensaje: "Primero debe crear a las Personas" });
                }
                newMovie.addRols(directors);
                personCasting.addRols(directors);
                directors.addPeople(personCasting);
                directors.addMovie(newMovie);
            }));
        }
        if (Producers) {
            parameterProducer.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                let personCasting = yield Person.findOne({
                    where: {
                        Name: element[0],
                        LastName: element[1] + `${element[2] ? " " + element[2] : ""}`,
                    },
                });
                let poducers = yield Rol.create({
                    rolName: "Producers",
                });
                if (!personCasting) {
                    return res
                        .status(400)
                        .json({ mensaje: "Primero debe crear a las Personas" });
                }
                newMovie.addRols(poducers);
                personCasting.addRols(poducers);
                poducers.addPeople(personCasting);
                poducers.addMovie(newMovie);
            }));
        }
        res.status(200).json({
            mensaje: "Pelicula creada con exito",
            newMovie,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Ha ocurrido un error" });
    }
});
exports.createMovie = createMovie;
const editMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        const { Title, Year } = req.body;
        if (!id || !Number.isSafeInteger(Number(id))) {
            return res.status(400).json({ mensaje: "Debe colocar un id valido" });
        }
        if (!Title || !Year) {
            return res.status(400).json({ mensaje: "Debe colocar un Title o Year" });
        }
        let editMovie = yield Movie.update({
            Title,
            Year,
        }, {
            where: {
                id,
            },
        });
        if (!editMovie) {
            return res.status(400).json({ mensaje: "La pelicula no existe" });
        }
        res.status(200).json({ mensaje: "Pelicula editada con exito", editMovie });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Hubo un error" });
    }
});
exports.editMovie = editMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !Number.isSafeInteger(Number(id))) {
            return res.status(400).json({ mensaje: "Debe colocar un id valido" });
        }
        let movieDeleted = yield Movie.destroy({
            where: {
                id: id,
            },
        });
        if (!movieDeleted) {
            return res.status(400).json({ mensaje: "La pelicula no existe" });
        }
        res.status(200).json({
            mensaje: "Pelicula eliminada correctamente",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Hubo un error" });
    }
});
exports.deleteMovie = deleteMovie;
