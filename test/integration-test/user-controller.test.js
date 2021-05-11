const axios = require("axios").default;
const chai = require("chai");
const expect = chai.expect;
const { Message } = require("../../src/entities/message-entity");

describe("Integration Test: User Controller", () => {
  it("Required input params for create user ", async () => {
    try {
      const url = `${global.baseUrl}/user/create`;
      await axios.post(url, null);
    } catch ({ response }) {
      expect(response.status).to.be.equal(400);
      expect(response.data.message).to.be.equal(Message.bodyNotProvided());
    }
  });

  it("Required alphanumeric and lenght data in password field", async () => {
    try {
      const body = {
        name: "wilmar",
        lastName: "duque",
        userName: "wsduquev",
        password: "Sesa33",
        currency: "ars",
      };
      const url = `${global.baseUrl}/user/create`;
      await axios.post(url, body);
    } catch ({ response }) {
      expect(response.status).to.be.equal(400);
      expect(response.data.message).to.be.equal(Message.passwordNotValid());
    }
  });

  it("Required valid input currency data (ARS, EUR, USD)", async () => {
    try {
      const body = {
        name: "wilmar",
        lastName: "duque",
        userName: "wsduquev",
        password: "Sesamo123*",
        currency: "art",
      };
      const url = `${global.baseUrl}/user/create`;
      await axios.post(url, body);
    } catch ({ response }) {
      expect(response.status).to.be.equal(400);
      expect(response.data.message).to.be.equal(
        Message.dataNotValid("currency")
      );
    }
  });
});
