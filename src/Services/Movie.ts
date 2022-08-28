import { Express, Request, Response } from "express";
const { Person, Movie } = require("../db");

const getMovies = async (req: Request, res: Response) => {
  try {
    let allMovies = await Movie.findAll({
      attributes: ["id", "Title", "Year"],
      include: {
        model: Person,
        attributes: ["Name"],
        through: {
          attributes: [],
        },
      },
    });
    res.status(200).json({
      mensaje: "Todas las Peliculas",
      peliculas: allMovies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Ha ocurrido un error" });
  }
};

const getMovieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || !Number.isSafeInteger(Number(id))) {
      return res.status(400).json({ mensaje: "Debe colocar un id valido" });
    }

    let movie = await Person.findOne({
      where: {
        id,
      },
      attributes: ["id", "Name", "LastName", "Age"],
    });

    if (!movie) {
      return res.status(400).json({ mensaje: "La pelicula no existe" });
    }

    res.status(200).json({ mensaje: "Todo Ok", Movie: movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};

const createMovie = async (req: Request, res: Response) => {
  try {
    const { Title, Year, Casting, Directors, Producers } = req.body;

    let newMovie = await Movie.create({
      Title,
      Year,
    });

    let person = await Person.findAll({
      where: {
        Name: Casting[0].split(" ")[0],
      },
    });

    newMovie.addPeople(person);

    res.status(200).json({
      mensaje: "Pelicula creada con exito",
      newMovie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Ha ocurrido un error" });
  }
};

const editMovie = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const { Title, Year } = req.body;

    if (!id || !Number.isSafeInteger(Number(id))) {
      return res.status(400).json({ mensaje: "Debe colocar un id valido" });
    }

    if (!Title || !Year) {
      return res.status(400).json({ mensaje: "Debe colocar un Title o Year" });
    }
    let editMovie = await Movie.update(
      {
        Title,
        Year,
      },
      {
        where: {
          id,
        },
      }
    );
    if (!editMovie) {
      return res.status(400).json({ mensaje: "La pelicula no existe" });
    }
    res.status(200).json({ mensaje: "Pelicula editada con exito", editMovie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || !Number.isSafeInteger(Number(id))) {
      return res.status(400).json({ mensaje: "Debe colocar un id valido" });
    }
    let movieDeleted = await Movie.destroy({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};

export { getMovies, getMovieById, createMovie, editMovie, deleteMovie };
