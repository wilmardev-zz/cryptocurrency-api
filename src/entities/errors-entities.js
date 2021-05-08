class Unauthorize extends Error {
  constructor(error) {
    super(error);

    this.data = { error };
    this.statusCode = 401;
  }
}

class BadRequest extends Error {
  constructor(error) {
    super(error);

    this.data = { error };
    this.statusCode = 400;
  }
}

module.exports = { Unauthorize, BadRequest };
