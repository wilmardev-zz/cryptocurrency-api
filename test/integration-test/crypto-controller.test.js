const axios = require("axios").default;
const chai = require("chai");
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
    try {
      const url = `${global.baseUrl}/crypto/create`;
      const token = await getToken();
      const headers = { Authorization: token };
      await axios.post(url, null, { headers });
    } catch ({ response }) {
      expect(response.status).to.be.equal(400);
      expect(response.data.message).to.be.equal(Message.dataNotProvided("id"));
    }
  });

  it("success get all cryptocurrencies", async () => {
    const token = await getToken();
    const headers = { Authorization: token };
    const url = `${global.baseUrl}/crypto/list`;
    let result = await axios.get(url, { headers });
    expect(result.status).to.be.equal(200);
    expect(result.data).not.be.null;
  });

  it("success get cryptocurrencies associated for an user", async () => {
    const token = await getToken();
    const headers = { Authorization: token };
    const url = `${global.baseUrl}/crypto/user/list`;
    let result = await axios.get(url, { headers });
    expect(result.status).to.be.equal(200);
    expect(result.data).not.be.null;
  });

  const getToken = async () => {
    const body = {
      userName: "wsduquev",
      password: "Sesamo33*",
    };
    const url = `${global.baseUrl}/user/login`;
    const { data } = await axios.post(url, body);
    return data.token;
  };
});
