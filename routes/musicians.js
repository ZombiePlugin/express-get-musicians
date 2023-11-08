const express = require("express");
const musicianRouter = express.Router();
const Musician = require("../models/Musician");

musicianRouter.get("/", async (req, res) => {
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

musicianRouter.get("/:id", async (req, res) => {
  const foundMusician = await Musician.findByPk(req.params.id);
  res.json(foundMusician);
});

musicianRouter.post("/", async (req, res) => {
  const newMusician = await Musician.create(req.body);
  res.json(newMusician);
});

musicianRouter.put("/:id", async (req, res) => {
  const updatedMusician = await Musician.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedMusician);
});

musicianRouter.delete("/:id", async (req, res) => {
  const deletedMusician = await Musician.destroy({
    where: { id: req.params.id },
  });
  res.json(deletedMusician);
});

module.exports = musicianRouter;
