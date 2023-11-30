const { Ticket } = require("../models");
const { Op } = require("sequelize");
const cloudinary = require("../config/cloudinary");

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

const updateTicket = async (req, res) => {
  const { bukti_ktp, bukti_meter, validasi, lokasi } = req.body;
  const { id } = req.params;

  try {
    const updatedTicket = await Ticket.findOne({ where: { id } });

    if (updatedTicket == null) {
      res.status(404).json({ message: "id ticket tidak ditemukan" });
      return;
    }

    if (bukti_ktp !== null || bukti_ktp === "") {
      const oldFileBuktiKtp = updatedTicket.bukti_ktp;
      if (oldFileBuktiKtp !== null) {
        const getImageID = oldFileBuktiKtp.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`bukti-pictures/${getImageID}`);
      }
    }

    if (bukti_meter !== null || bukti_meter === "") {
      const oldFileBuktiMeter = updatedTicket.bukti_meter;
      if (oldFileBuktiMeter !== null) {
        const getImageID = oldFileBuktiMeter.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`bukti-pictures/${getImageID}`);
      }
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(
      file,
      { folder: "backend-files" },
      async function (err, result) {
        if (!!err) {
          res.status(400).json({
            status: "Update Failed",
            errors: err.message,
          });
          return;
        }

        const confirm = result.url;

        if (bukti_ktp !== null || bukti_ktp === "") {
          const [numRowsUpdated] = await Ticket.update(
            { bukti_ktp: confirm, bukti_meter, validasi, lokasi },
            { where: { id } }
          );
          console.log(numRowsUpdated);
          if (numRowsUpdated === 1) {
            if (updatedTicket) {
              res.status(200).json({
                status: "OK",
                message: "UPDATE ITEM SUCCESFULLY",
              });
            }
          } else {
            res.status(404).json({
              status: "FAILED",
              message: `Item with ${id} is not exist`,
            });
          }
        } else if (bukti_meter !== null || bukti_meter === "") {
          const [numRowsUpdated] = await Ticket.update(
            { bukti_ktp, bukti_meter: confirm, validasi, lokasi },
            { where: { id } }
          );
          console.log(numRowsUpdated);
          if (numRowsUpdated === 1) {
            if (updatedTicket) {
              res.status(200).json({
                status: "OK",
                message: "UPDATE ITEM SUCCESFULLY",
              });
            }
          } else {
            res.status(404).json({
              status: "FAILED",
              message: `Item with ${id} is not exist`,
            });
          }
        } else {
          const [numRowsUpdated] = await Ticket.update(
            { bukti_ktp, bukti_meter, validasi, lokasi },
            { where: { id } }
          );
          console.log(numRowsUpdated);
          if (numRowsUpdated === 1) {
            if (updatedTicket) {
              res.status(200).json({
                status: "OK",
                message: "UPDATE ITEM SUCCESFULLY",
              });
            }
          } else {
            res.status(404).json({
              status: "FAILED",
              message: `Item with ${id} is not exist`,
            });
          }
        }
      }
    );
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
