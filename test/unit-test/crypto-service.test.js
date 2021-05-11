const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const cryptoService = require("../../src/services/crypto-service");
const cryptoAdapter = require("../../src/adapters/crypto-adapter");
const cryptoRepository = require("../../src/repositories/crypto-repository");
const { BadRequest, Conflict } = require("../../src/entities/errors-entities");
const { Message } = require("../../src/entities/message-entity");

describe("Cryptocurrency service", () => {
  it("should returns cryptocurrency list", async () => {
    const stubValue = [
      {
        id: "01coin",
        symbol: "zoc",
        name: "01coin",
      },
      {
        id: "0-5x-long-algorand-token",
        symbol: "algohalf",
        name: "0.5X Long Algorand Token",
      },
    ];
    const stub = sinon.stub(cryptoAdapter, "getAll").returns(stubValue);
    const response = await cryptoService.get("ARS");
    expect(stub.called).to.be.true;
    expect(response).to.be.a("array");
    expect(response[0]).to.have.property("id");
    expect(response[0]).to.have.property("symbol");
    expect(response[0]).to.have.property("name");
  });

  afterEach(() => sinon.restore());

  const inputData = {
    id: "bitcoins",
    userName: "wsduquev",
    currency: "ARS",
  };

  it("should be associate a cryptocurrency to user", async () => {
    const stubAditionalInfo = [
      {
        id: "0-5x-long-algorand-token",
        symbol: "algohalf",
        name: "0.5X Long Algorand Token",
        image:
          "https://assets.coingecko.com/coins/images/12009/large/683JEXMN_400x400.png?1596692452",
        current_price: 17649.25,
        last_updated: "2021-05-10T20:33:47.126Z",
      },
    ];
    const stubAdapter = sinon
      .stub(cryptoAdapter, "getPrice")
      .returns({ bitcoin: {} });
    sinon.stub(cryptoAdapter, "getAditionalInfo").returns(stubAditionalInfo);
    const stubRepository = sinon
      .stub(cryptoRepository, "getByCryptoAndUser")
      .returns(null);
    sinon.stub(cryptoRepository, "create").returns({});
    await cryptoService.create(inputData);
    expect(stubAdapter.calledOnce).to.be.true;
    expect(stubRepository.calledOnce).to.be.true;
  });

  it("should be throw error because the cryptocurrency not exist", async () => {
    const stubAdapter = sinon.stub(cryptoAdapter, "getPrice").returns({});
    try {
      sinon.stub(cryptoRepository, "create").returns({});
      await cryptoService.create(inputData);
    } catch (error) {
      const cError = new BadRequest(Message.notFound(inputData.id));
      expect(stubAdapter.calledOnce).to.be.true;
      expect(error).to.deep.include(cError);
    }
  });

  it("should be throw error because the cryptocurrency is already associated for the user", async () => {
    const stubAdapter = sinon
      .stub(cryptoAdapter, "getPrice")
      .returns({ bitcoin: {} });
    const stubRepository = sinon
      .stub(cryptoRepository, "getByCryptoAndUser")
      .returns({});
    try {
      sinon.stub(cryptoRepository, "create").returns({});
      await cryptoService.create(inputData);
    } catch (error) {
      const cError = new Conflict(Message.alreadyExistCrypto(inputData.id));
      expect(stubAdapter.calledOnce).to.be.true;
      expect(stubRepository.calledOnce).to.be.true;
      expect(error).to.deep.include(cError);
    }
  });

  it("should be return the cryptocurrencies associated for an unser", async () => {
    const stubCryptoInfo = [
      {
        Name: "Ethereum",
        Image:
          "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        Symbol: "eth",
        ArsPrice: 358708,
        UsdPrice: 3827.27,
        EurPrice: 3146.59,
        LastUpdate: "2021-05-08T20:18:09.999Z",
      },
    ];
    const stub = sinon
      .stub(cryptoRepository, "getByUser")
      .returns(stubCryptoInfo);
    const response = await cryptoService.getByUser(
      inputData.userName,
      inputData.currency,
      "asc",
      1
    );
    expect(stub.calledOnce).to.be.true;
    expect(response).to.be.a("array");
    response.forEach((item) => {
      expect(typeof item).to.be.equal("object");
      expect(item).to.deep.include(stubCryptoInfo[0]);
    });
  });
});
