const router = require("express").Router();
const ticketRouter = require("./ticketRouter");

router.use("/api/v1", ticketRouter);

module.exports = router;
