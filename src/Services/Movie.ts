import { Express, Request, Response } from "express";
const { Person, Movie } = require("../db");

const getMovies = async (req: Request, res: Response) => {
  try {
    let allMovies = await Movie.findAll({
      attributes: ["id", "Title", "Year"],
    });
    res.status(200).json({
      mensaje: "Todas las Peliculas",
      peliculas: allMovies,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: "Ha ocurrido un erro" });
  }
};

const createMovie = async (req: Request, res: Response) => {
  try {
    const { Title, Year, Casting, Directors, Producers } = req.body;

    let movie = await Movie.findOrCreate({
      where: {
        Title,
        Year,
      },
    });

    res.status(200).json({
      mensaje: "Pelicula creada con exito",
      movie,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: "Ha ocurrido un error" });
  }
};

export { getMovies, createMovie };
