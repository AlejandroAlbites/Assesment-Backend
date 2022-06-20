const clonServer = require("supertest");
const jwt = require("jsonwebtoken");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const User = require("../models/user.model");

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

  it("should not create fav if user is not authenticated", async () => {
    const fav = {
      title: "music",
      description: "musics list",
      link: "https://google/music",
    };
    const res = await clonServer(app).post("/api/listFavs/fav").send(fav);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Your sesion expired/i);
  });

  it("should not create fav if token is empty", async () => {
    const fav = {
      title: "music",
      description: "musics list",
      link: "https://google/music",
    };
    const res = await clonServer(app)
      .post("/api/listFavs/fav")
      .send(fav)
      .set("Authorization", "Bearer ")
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Your sesion expired/i);
  });

  it("should not create fav if token is invalid", async () => {
    const fav = {
      title: "music",
      description: "musics list",
      link: "https://google/music",
    };
    const res = await clonServer(app)
      .post("/api/listFavs/fav")
      .send(fav)
      .set("Authorization", "Bearer 123442")
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/jwt malformed/i);
  });
});
