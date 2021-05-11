const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const userService = require("../../src/services/user-service");
const userRepository = require("../../src/repositories/user-repository");
const { Unauthorize, Conflict } = require("../../src/entities/errors-entities");
const { Message } = require("../../src/entities/message-entity");

describe("Unit Test: User service", () => {
  const createInputData = {
    name: "camilo",
    lastName: "duque",
    userName: "wsduquev",
    password: "Sesamo123",
    currency: "ars",
  };

  it("should create an user", async () => {
    const stub = sinon.stub(userRepository, "getByUserName").returns(null);
    sinon.stub(userRepository, "create").returns({});
    await userService.create(createInputData);
    expect(stub.called).to.be.true;
  });

  afterEach(() => sinon.restore());

  it("should be throw error because the user already exist", async () => {
    const stub = sinon.stub(userRepository, "getByUserName").returns({});
    sinon.stub(userRepository, "create").returns({});
    try {
      await userService.create(createInputData);
    } catch (error) {
      const cError = new Conflict(Message.userExist(createInputData.userName));
      expect(stub.calledOnce).to.be.true;
      expect(error).to.deep.include(cError);
    }
  });

  const loginInputData = {
    userName: "wsduquev",
    password: "Sesamo123",
  };

  it("should be throw error because the user is unauthorized", async () => {
    const stub = sinon.stub(userRepository, "getByUserName").returns({});
    try {
      await userService.login(loginInputData);
    } catch (error) {
      const cError = new Unauthorize(Message.loginInvalid());
      expect(stub.calledOnce).to.be.true;
      expect(error).to.deep.include(cError);
    }
  });

  it("should be return jwtToken", async () => {
    const stub = sinon
      .stub(userRepository, "getByUserName")
      .returns({ Currency: "ARS", Password: loginInputData.password });
    const jwt = await userService.login(loginInputData);
    expect(stub.calledOnce).to.be.true;
    expect(jwt).to.not.be.null;
    expect(jwt).to.have.property("token");
    expect(jwt).to.have.property("token").to.not.be.null;
  });
});
