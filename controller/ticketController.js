const { Ticket } = require("../models");
const { Op } = require("sequelize");

const searchTickets = async (req, res) => {
  try {
    // Extract the search query from the request parameters
    const searchQuery = req.query.value;
    console.log(searchQuery);

    // Define the search criteria
    const whereClause = searchQuery
      ? {
          [Op.or]: [
            { full_name: { [Op.like]: `%${searchQuery}%` } },
            { nik: { [Op.like]: `%${searchQuery}%` } },
            { alamat: { [Op.like]: `%${searchQuery}%` } },
          ],
        }
      : {};
    console.log(whereClause);

    const listTicket = await Ticket.findAll({ where: whereClause });

    res.status(200).json({
      status: "OK",
      data: { Ticket: listTicket },
      meta: { count: listTicket.length },
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

const findAllTickets = async (req, res) => {
  try {
    const listTicket = await Ticket.findAll();
    res.status(200).json({
      status: "OK",
      data: { Ticket: listTicket },
      meta: { count: listTicket.length },
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

const findTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        status: "FAIL",
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      status: "OK",
      data: { Ticket: ticket },
      meta: { count: 1 },
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

const createTicket = async (req, res) => {
  try {
    const fullName = req.body.fullname;
    const nik = req.body.nik;
    const nkk = req.body.nkk;
    const id_pel = req.body.id_pel;
    const no_hp = req.body.no_hp;
    const alamat = req.body.alamat;
    const lokasi = req.body.lokasi;
    const validasi = req.body.validasi;
    const bukti_ktp = req.body.bukti_ktp;
    const bukti_meter = req.body.bukti_meter;
    const ticket = await Ticket.create({
      full_name: fullName,
      nik: nik,
      nkk: nkk,
      id_pel: id_pel,
      no_hp: no_hp,
      alamat: alamat,
      lokasi: lokasi,
      validasi: validasi,
      bukti_ktp: bukti_ktp,
      bukti_meter: bukti_meter,
    });
    res.status(201).json({
      ticket,
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

const updateTicket = async (res, req) => {
  const { bukti_ktp, bukti_meter, validasi, lokasi } = req.body;
  const { id } = req.params;

  try {
    const [numRowsUpdated] = await Ticket.update(
      { bukti_ktp, bukti_meter, validasi, lokasi },
      { where: { id } }
    );
    console.log(numRowsUpdated);
    if (numRowsUpdated === 1) {
      const updatedTicket = await Ticket.findByPk({ where: { id } });
      if (updatedTicket) {
        res.status(200).json({
          status: "OK",
          message: "UPDATE ITEM SUCCESFULLY",
          data: updatedTicket,
        });
      }
    } else {
      res.status(404).json({
        status: "FAILED",
        message: `Item with ${id} is not exist`,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

module.exports = {
  findAllTickets,
  createTicket,
  searchTickets,
  findTicketById,
  updateTicket,
};
