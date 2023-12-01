const router = require("express").Router();
const ticketRouter = require("./ticketRouter");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

router.use("/api/v1", ticketRouter);

module.exports = router;
