import { Express, Request, Response } from "express";
const { Person, Movie } = require("../db");

const getPersons = async (req: Request, res: Response) => {
  try {
    let allPersons = await Person.findAll({
      attributes: ["id", "Name", "LastName", "Age"],
    });
    res.status(200).json({
      mensaje: "Todo ok",
      Personas: allPersons,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Todo no ok" });
  }
};

const createPerson = async (req: Request, res: Response) => {
  try {
    const {
      Name,
      LastName,
      Age,
      ["Movies as Producer"]: Producer,
      ["Movies as Director"]: Director,
      ["Movies as Actor/Actress"]: Actor,
    } = req.body;
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

export { getPersons, createPerson };
