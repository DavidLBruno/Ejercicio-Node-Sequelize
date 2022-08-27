import { Express, Request, Response } from "express";
const { Person, Movie } = require("../db");

const getPersons = (req: Request, res: Response) => {
  try {
    res.status(200).json({ mensaje: "Todo ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: "Todo no ok" });
  }
};

const createPerson = async (req: Request, res: Response) => {
  try {
    const { Name, LastName, Age } = req.body;

    let persona = await Person.findOrCreate({
      where: {
        Name,
        LastName,
        Age,
      },
    });

    res.status(200).json({
      mensaje: "Persona crada con exito!",
      persona,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: "Hubo un error" });
  }
};

export { getPersons, createPerson };
