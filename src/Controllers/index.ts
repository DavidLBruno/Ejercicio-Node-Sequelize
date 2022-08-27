import express, { Router } from "express";
import { createMovie, getMovies } from "../Services/Movie";
import { createPerson, getPersons } from "../Services/Person";

const router = Router();

/* Persons */
router.get("/persons", getPersons);
router.post("/persons", createPerson);

/* Movies */
router.get("/movies", getMovies);
router.post("/movies", createMovie);

export default router;
