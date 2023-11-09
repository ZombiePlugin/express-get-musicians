const express = require("express");
const musicianRouter = express.Router();
const Musician = require("../models/Musician");
const { check, validationResult } = require("express-validator");

musicianRouter.get("/", async (req, res) => {
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

musicianRouter.get("/:id", async (req, res) => {
  const foundMusician = await Musician.findByPk(req.params.id);
  res.json(foundMusician);
});

musicianRouter.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim(),
    check("name").isLength({ min: 2, max: 20 }),
    check("instrument").isLength({ min: 2, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const newMusician = await Musician.create(req.body);
      res.json(newMusician);
    }
  }
);

musicianRouter.put(
  "/:id",
  [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim(),
    check("name").isLength({ min: 2, max: 20 }),
    check("instrument").isLength({ min: 2, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const updatedMusician = await Musician.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(updatedMusician);
    }
  }
);

musicianRouter.delete("/:id", async (req, res) => {
  const deletedMusician = await Musician.destroy({
    where: { id: req.params.id },
  });
  res.json(deletedMusician);
});

module.exports = musicianRouter;
