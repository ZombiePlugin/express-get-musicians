const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");
const musicianRouter = require("../routes/musicians");
const bandsRouter = require("../routes/bands");

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/musicians", musicianRouter);
app.use("/bands", bandsRouter);

// app.get("/musicians", async (req, res) => {
//   const allMusicians = await Musician.findAll();
//   res.json(allMusicians);
// });

// app.get("/musicians/:id", async (req, res) => {
//   const foundMusician = await Musician.findByPk(req.params.id);
//   res.json(foundMusician);
// });

// app.post("/musicians", async (req, res) => {
//   const newMusician = await Musician.create(req.body);
//   res.json(newMusician);
// });

// app.put("/musicians/:id", async (req, res) => {
//   const updatedMusician = await Musician.update(req.body, {
//     where: { id: req.params.id },
//   });
//   res.json(updatedMusician);
// });

// app.delete("/musicians/:id", async (req, res) => {
//   const deletedMusician = await Musician.destroy({
//     where: { id: req.params.id },
//   });
//   res.json(deletedMusician);
// });
module.exports = app;
