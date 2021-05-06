const server = require("./src/config/server");
if (process.env.NODE_ENV === "production") {
  // Make production config
}
server.run();
