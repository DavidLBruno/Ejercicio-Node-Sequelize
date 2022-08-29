import express, { Router } from "express";
import {
  createMovie,
  deleteMovie,
  editMovie,
  getMovieById,
  getMovies,
} from "../Services/Movie";
import {
  createPerson,
  deletePerson,
  editPerson,
  getPersonById,
  getPeople,
} from "../Services/Person";

const router = Router();

/* Persons */
router.get("/persons", getPeople);
router.get("/person/:id", getPersonById);
router.post("/person", createPerson);
router.put("/person/:id", editPerson);
router.delete("/person/:id", deletePerson);

/* Movies */
router.get("/movies", getMovies);
router.get("/movie/:id", getMovieById);
router.post("/movie", createMovie);
router.put("/movie/:id", editMovie);
router.delete("/movie/:id", deleteMovie);

export default router;
