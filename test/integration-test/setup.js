before(async () => {
  global.baseUrl = "http://localhost:5005/api/v1";
  console.log("Testing server listenting...\n");
});

after(() => {
  process.exit();
});
