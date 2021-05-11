const axios = require("axios").default;
const chai = require("chai");
const expect = chai.expect;
const { Message } = require("../../src/entities/message-entity");

describe("Integration Test: Login Controller", () => {
  it("Success login ", async () => {
    const body = {
      userName: "wsduquev",
      password: "Sesamo33*",
    };
    const url = `${global.baseUrl}/user/login`;
    const result = await axios.post(url, body);
    expect(result.status).to.be.equal(200);
    expect(result.data.token).not.be.null;
  });

  it("Failure login ", async () => {
    try {
      const body = {
        userName: "wsduquev",
        password: "Sesamosw33*",
      };
      const url = `${global.baseUrl}/user/login`;
      await axios.post(url, body);
    } catch ({ response }) {
      expect(response.status).to.be.equal(401);
      expect(response.data.message).to.be.equal(Message.loginInvalid());
    }
  });

  it("Validate input data for login ", async () => {
    try {
      const body = {
        userName: "wsduquev",
        password: "Sesamosw33*",
      };
      const url = `${global.baseUrl}/user/login`;
      await axios.post(url, body);
    } catch ({ response }) {
      expect(response.status).to.be.equal(401);
      expect(response.data.message).to.be.equal(Message.loginInvalid());
    }
  });
});
