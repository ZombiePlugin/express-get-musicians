// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const musicianRouter = require("./routes/musicians");
const { syncSeed } = require("./seed");

beforeAll(async () => {
  await syncSeed();
});

describe("./musicians endpoint", () => {
  // Write your tests here
  test("Testing Musicians endpoint", async () => {
    // Sends request to `/bakedGoods` endpoint
    const response = await request(app).get("/musicians");
    expect(response.statusCode).toBe(200);
  });
  test("Find musician by id", async () => {
    const response = await request(app).get("/musicians/1");
    expect(response.statusCode).toBe(200);
  });
  test("Create new musician", async () => {
    const createdGuy = { name: "Guy", instrument: "Guitar" };
    const response = await request(app)
      .post("/musicians")
      .send(createdGuy)
      .expect(200)
      .expect((res) => {
        res.body.name = "Guy";
      });
  });
  test("Create new musician returns error if string is empty", async () => {
    const createdGuy = { name: "", instrument: "" };
    const response = await request(app)
      .post("/musicians")
      .send(createdGuy)
      .expect(200)
      .expect((res) => {
        res.body = {
          error: [
            {
              type: "field",
              value: "",
              msg: "Invalid value",
              path: "name",
              location: "body",
            },
            {
              type: "field",
              value: "",
              msg: "Invalid value",
              path: "instrument",
              location: "body",
            },
          ],
        };
      });
  });
  test("Create new musician returns error if string is too big or small", async () => {
    const createdGuy = { name: "a", instrument: "a" };
    const response = await request(app)
      .post("/musicians")
      .send(createdGuy)
      .expect(200)
      .expect((res) => {
        res.body = {
          error: [
            {
              type: "field",
              value: "a",
              msg: "Invalid value",
              path: "name",
              location: "body",
            },
            {
              type: "field",
              value: "a",
              msg: "Invalid value",
              path: "instrument",
              location: "body",
            },
          ],
        };
      });
  });
  test("Update musician by id", async () => {
    const NewGuy = { name: "New Guy", instrument: "Violin" };
    const response = await request(app)
      .put("/musicians/4")
      .send(NewGuy)
      .expect(200)
      .expect((res) => {
        res.body.name = "New Guy";
      });
  });
  test("Update musician throws correct errors", async () => {
    const NewGuy = { name: "N", instrument: "" };
    const response = await request(app)
      .put("/musicians/4")
      .send(NewGuy)
      .expect(200)
      .expect((res) => {
        res.body.name = {
          error: [
            {
              type: "field",
              value: "",
              msg: "Invalid value",
              path: "instrument",
              location: "body",
            },
            {
              type: "field",
              value: "N",
              msg: "Invalid value",
              path: "name",
              location: "body",
            },
            {
              type: "field",
              value: "",
              msg: "Invalid value",
              path: "instrument",
              location: "body",
            },
          ],
        };
      });
  });
  test("Delete musician by id", async () => {
    const response = await request(app)
      .delete("/musicians/4")
      .expect(200)
      .expect((res) => {
        res.body.name = "New Guy";
      });
  });
});
