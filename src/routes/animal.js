const express = require("express");
const router = express.Router(); //manejador de rutas de express
const animalSchema = require("../models/animal"); //Nuevo animal
//endpoint para Nuevo animal
router.post("/animals", (req, res) => {
  const animal = animalSchema({
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipo: req.body.tipo,
    fecha: new Date(req.body.fecha),
  });

  animal
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//endpoint para Consultar todos los animales
router.get("/animals", (req, res) => {
  animalSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endopoint para Consultar un animal
router.get("/animals/:id", (req, res) => {
  const { id } = req.params;
  animalSchema
    .findOne({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endpoint para Modificar un animal usando el id
router.put("/animals/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, edad, tipo, fecha } = req.body;
  animalSchema
    .updateOne(
      { _id: id },
      {
        $set: { nombre, edad, tipo, fecha },
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

//endpoint para Eliminar un animal usando el id
router.delete("/animals/:id", (req, res) => {
  const { id } = req.params;
  animalSchema
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});
module.exports = router;
