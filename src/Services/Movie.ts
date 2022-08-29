import { Express, Request, Response } from "express";
const { Person, Movie, Rol } = require("../db");

const getMovies = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (name) {
      let allMovies = await Movie.findOne({
        where: {
          Title: name,
        },
        attributes: ["id", "Title", "Year"],
        include: {
          model: Rol,
          attributes: ["RolName"],
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
    } else if (!name) {
      let allMovies = await Movie.findAll({
        attributes: ["id", "Title", "Year"],
        include: {
          model: Rol,
          attributes: ["RolName"],
          group: "RolName",

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

    let movie = await Movie.findOne({
      where: {
        id,
      },
      attributes: ["id", "Title", "Year"],
      include: {
        model: Rol,
        attributes: ["RolName"],
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};

const createMovie = async (req: Request, res: Response) => {
  try {
    const { Title, Year, Casting, Directors, Producers } = req.body;

    const parameterCasting = Casting.map((element: string) =>
      element.split(" ")
    );
    const parameterDirector = Directors.map((element: string) =>
      element.split(" ")
    );
    const parameterProducer = Producers.map((element: string) =>
      element.split(" ")
    );

    let newMovie = await Movie.create({
      Title,
      Year,
    });

    if (Casting) {
      parameterCasting.forEach(async (element: Array<string>) => {
        let personCasting = await Person.findOne({
          where: {
            Name: element[0],
            LastName: element[1] + `${element[2] ? " " + element[2] : ""}`,
          },
        });
        let casting = await Rol.create({
          RolName: "Casting",
        });
        console.log(casting);
        if (!personCasting) {
          return res
            .status(400)
            .json({ mensaje: "Primero debe crear a las Personas" });
        }
        newMovie.addRols(casting);
        personCasting.addRols(casting);
        casting.addPeople(personCasting);
        casting.addMovie(newMovie);
      });
    }

    if (Directors) {
      parameterDirector.forEach(async (element: Array<string>) => {
        let personCasting = await Person.findOne({
          where: {
            Name: element[0],
            LastName: element[1] + `${element[2] ? " " + element[2] : ""}`,
          },
        });
        let directors = await Rol.create({
          RolName: "Directors",
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
      });
    }

    if (Producers) {
      parameterProducer.forEach(async (element: Array<string>) => {
        let personCasting = await Person.findOne({
          where: {
            Name: element[0],
            LastName: element[1] + `${element[2] ? " " + element[2] : ""}`,
          },
        });
        let poducers = await Rol.create({
          RolName: "Producers",
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
      });
    }

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
