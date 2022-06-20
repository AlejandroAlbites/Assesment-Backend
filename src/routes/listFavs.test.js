const clonServer = require("supertest");
const jwt = require("jsonwebtoken");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const User = require("../models/user.model");
const { generateJWT } = require("../helpers/generateJWT");

describe("listFavs", () => {
  let user;
  let token;
  beforeAll(() => {
    connect();
  });

  beforeEach(async () => {
    await cleanup();
    const data = { email: "test@test.com", password: "12345" };
    user = await User.create(data);
    token = jwt.sign({ id: user._id }, process.env.SECRET_JWT_SEED, {
      expiresIn: 60 * 60 * 24 * 365,
    });
  });

  afterAll(async () => {
    await disconnected();
  });

  it("should not create listFavs if user is not authenticated", async () => {
    const listFav = { name: "music" };
    const res = await clonServer(app).post("/api/favs").send(listFav);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Your sesion expired/i);
  });

  it("should not create listFavs if token is empty", async () => {
    const listFav = { name: "music" };
    const res = await clonServer(app)
      .post("/api/favs")
      .send(listFav)
      .set("Authorization", "Bearer ")
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Your sesion expired/i);
  });

  it("should not create listFavs if token is invalid", async () => {
    const listFav = { name: "music" };
    const res = await clonServer(app)
      .post("/api/favs")
      .send(listFav)
      .set("Authorization", "Bearer 12345")
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/jwt malformed/i);
  });
});
