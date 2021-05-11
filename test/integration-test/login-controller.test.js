const chai = require("chai");
const supertest = require("supertest");
const expect = chai.expect;
const { Message } = require("../../src/entities/message-entity");

describe("Integration Test: Login Controller", () => {
  it("Success login ", async () => {
    const body = {
      userName: "wsduquev",
      password: "Sesamo33*",
    };
    let result = await supertest(global.app)
      .post("/api/v1/user/login")
      .send(body);
    expect(result.statusCode).to.be.equal(200);
    expect(result.body.token).not.be.null;
  });

  it("Failure login ", async () => {
    const body = {
      userName: "wsduquev",
      password: "Sesamo3s3*",
    };
    let result = await supertest(global.app)
      .post("/api/v1/user/login")
      .send(body);
    expect(result.statusCode).to.be.equal(401);
    expect(result.body.message).to.be.equal(Message.loginInvalid());
  });

  it("Validate input data for login ", async () => {
    let result = await supertest(global.app)
      .post("/api/v1/user/login")
      .send({});
    expect(result.statusCode).to.be.equal(401);
    expect(result.body.message).to.be.equal(Message.loginInvalid());
  });
});
