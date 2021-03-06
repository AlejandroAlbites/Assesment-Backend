const clonServer = require("supertest");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const User = require("../models/user.model");

describe("user", () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnected();
  });

  it("should create a user correctly", async () => {
    const user = { email: "test@test.com", password: "12345" };
    const res = await clonServer(app).post("/auth/local/register").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });

  it("should not create user when there is no email", async () => {
    const user = { password: "12345" };
    const res = await clonServer(app).post("/auth/local/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User coult not be create/i);
  });

  it("should not create user when email is invalid", async () => {
    const user = { email: "test", password: "12345" };
    const res = await clonServer(app).post("/auth/local/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User coult not be create/i);
  });

  it("should not create user when email already exists", async () => {
    const user = { email: "test2@test.com", password: "12345" };
    await User.create(user);
    const res = await clonServer(app).post("/auth/local/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User coult not be create/i);
  });

  //  ////////////////////////

  it("should not login when email is incorrect", async () => {
    const user = { email: "test@test.com", password: "12345" };
    await User.create(user);
    const res = await clonServer(app).post("/auth/local/login").send(user);
    console.log(res);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/the email or password is not correct/i);
  });

  it("should not login if incorrect password", async () => {
    const user = { email: "test2@test.com", password: "12345" };
    await User.create(user);

    const res = await clonServer(app)
      .post("/auth/local/login")
      .send({ ...user, password: "1" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/the email or password is not correct/i);
  });

  it("should not login user if email does not exist", async () => {
    const user = { email: "test2@test.com", password: "12345" };

    const res = await clonServer(app).post("/auth/local/login").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/the email or password is not correct/i);
  });
});
