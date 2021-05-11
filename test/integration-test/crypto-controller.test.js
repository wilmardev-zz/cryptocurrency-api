const chai = require("chai");
const supertest = require("supertest");
const axios = require("axios").default;
const expect = chai.expect;
const { Message } = require("../../src/entities/message-entity");

describe("Integration Test: Cryptocurrency Controller", () => {
  it("Validate token is sended or malformed", async () => {
    try {
      const url = `${global.baseUrl}/crypto/create`;
      await axios.post(url);
    } catch ({ response }) {
      expect(response.status).to.be.equal(401);
      expect(response.data.message).to.be.equal(Message.unauthorized());
    }
  });

  it("Validate token is invalid or expired", async () => {
    try {
      const headers = {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW5jeSI6IkFSUyIsInVzZXJOYW1lIjoid3NkdXF1ZXYiLCJpYXQiOjE2MjA3MDM2NDUsImV4cCI6MTYyMDcwMzcwNX0.DCTq2nfjPfZTcqBP6X4vYaj85cCe_-5RbQxKLf9WqLI",
      };
      const url = `${global.baseUrl}/crypto/create`;
      await axios.post(url, null, { headers });
    } catch ({ response }) {
      expect(response.status).to.be.equal(403);
      expect(response.data.message).to.be.equal(Message.tokenNotValid());
    }
  });

  it("success login and validate input params", async () => {
    const token = await getToken();
    let result = await supertest(global.app)
      .post("/api/v1/crypto/create")
      .set("Authorization", token)
      .send({});
    expect(result.statusCode).to.be.equal(400);
    expect(result.body.message).to.be.equal(Message.dataNotProvided("id"));
  });

  it("success get all cryptocurrencies", async () => {
    const token = await getToken();
    let result = await supertest(global.app)
      .get("/api/v1/crypto/list")
      .set("Authorization", token)
      .send({});
    expect(result.statusCode).to.be.equal(200);
    expect(result.body).not.be.null;
  });

  it("success get cryptocurrencies associated for an user", async () => {
    const token = await getToken();
    let result = await supertest(global.app)
      .get("/api/v1/crypto/user/list")
      .set("Authorization", token)
      .send({});
    expect(result.statusCode).to.be.equal(200);
    expect(result.body).not.be.null;
  });

  const getToken = async () => {
    const body = {
      userName: "wsduquev",
      password: "Sesamo33*",
    };
    const result = await supertest(global.app)
      .post("/api/v1/user/login")
      .send(body);
    return result.body.token;
  };
});
