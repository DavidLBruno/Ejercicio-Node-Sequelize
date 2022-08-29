"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Movie_1 = require("../Services/Movie");
const Person_1 = require("../Services/Person");
const router = (0, express_1.Router)();
/* Persons */
router.get("/persons", Person_1.getPeople);
router.get("/person/:id", Person_1.getPersonById);
router.post("/person", Person_1.createPerson);
router.put("/person/:id", Person_1.editPerson);
router.delete("/person/:id", Person_1.deletePerson);
/* Movies */
router.get("/movies", Movie_1.getMovies);
router.get("/movie/:id", Movie_1.getMovieById);
router.post("/movie", Movie_1.createMovie);
router.put("/movie/:id", Movie_1.editMovie);
router.delete("/movie/:id", Movie_1.deleteMovie);
exports.default = router;
