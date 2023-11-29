const router = require("express").Router();

const {
  findAllTickets,
  createTicket,
  searchTickets,
  findTicketById,
} = require("../controller/ticketController");

router.get("/ticket", findAllTickets);
router.get("/ticket/search", searchTickets);
router.get("/ticket/:id", findTicketById);
router.post("/ticket", createTicket);

module.exports = router;
