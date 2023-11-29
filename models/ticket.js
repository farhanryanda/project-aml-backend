"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init(
    {
      full_name: DataTypes.STRING,
      nik: DataTypes.STRING,
      nkk: DataTypes.STRING,
      id_pel: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      alamat: DataTypes.STRING,
      lokasi: DataTypes.STRING,
      validasi: DataTypes.STRING,
      bukti_ktp: DataTypes.STRING,
      bukti_meter: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
