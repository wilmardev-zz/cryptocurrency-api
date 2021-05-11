const server = require("../../src/config/server");

before(async () => {
  await server.run();
  global.app = server.app;
  console.log("Testing server listenting...\n");
});

after(() => {
  process.exit();
});
