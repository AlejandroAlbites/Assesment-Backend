const app = require("./app");
const { connect } = require("./db");

const port = process.env.PORT || 8000;
connect();

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
