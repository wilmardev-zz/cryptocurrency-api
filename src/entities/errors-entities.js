class Unauthorize extends Error {
  constructor(error) {
    super(error);

    this.data = { error };
    this.statusCode = 401;
  }
}

module.exports = { Unauthorize };
