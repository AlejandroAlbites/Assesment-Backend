const req = require("supertest");
const { connect, disconnected, cleanup } = require("./db");
const app = require("./app");

describe("App", () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnected();
  });

  it("should app", () => {
    expect(true).toBeTruthy();
  });
});
