const express = require("express");
const bandsRouter = express.Router();
const Band = require("../models/Band");
const { Musician } = require("../models");

bandsRouter.get("/", async (req, res) => {
  const allBands = await Band.findAll({ include: Musician });
  res.json(allBands);
});

bandsRouter.get("/:id", async (req, res) => {
  const foundBand = await Band.findOne({
    where: {
      id: req.params.id,
    },
    include: Musician,
  });
  res.json(foundBand);
});

module.exports = bandsRouter;
