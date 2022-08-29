import { Express, Request, Response } from "express";
const { Person, Movie, Rol } = require("../db");

const getPeople = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (name) {
      let allPeople = await Person.findOne({
        where: {
          Name: name,
        },
        attributes: ["id", "Name", "LastName", "Age"],
        include: {
          attributes: ["RolName"],
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
    } else if (!name) {
      let allPeople = await Person.findAll({
        attributes: ["id", "Name", "LastName", "Age"],
        include: {
          attributes: ["RolName"],
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Todo no ok" });
  }
};

const getPersonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || !Number.isSafeInteger(Number(id))) {
      return res.status(400).json({ mensaje: "Debe colocar un id valido" });
    }

    let person = await Person.findOne({
      where: {
        id,
      },
      attributes: ["id", "Name", "LastName", "Age"],
      include: {
        attributes: ["RolName"],
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};

const createPerson = async (req: Request, res: Response) => {
  try {
    const { Name, LastName, Age } = req.body;
    if (!Name || !LastName || !Age) {
      return res
        .status(400)
        .json({ mensaje: "Debe colocar Name, LastName y Age" });
    }

    let persona = await Person.findOrCreate({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};

const editPerson = async (req: Request, res: Response) => {
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
    let editPerson = await Movie.update(
      {
        Name,
        LastName,
        Age,
      },
      {
        where: {
          id,
        },
      }
    );
    if (!editPerson) {
      return res.status(400).json({ mensaje: "La persona no existe" });
    }
    res.status(200).json({ mensaje: "Persona editada con exito", editPerson });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};

const deletePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || !Number.isSafeInteger(Number(id))) {
      return res.status(400).json({ mensaje: "Debe colocar un id valido" });
    }
    let movieDeleted = await Person.destroy({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
};

export { getPeople, getPersonById, createPerson, editPerson, deletePerson };
