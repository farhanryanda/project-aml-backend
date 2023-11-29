"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tickets", [
      {
        full_name: "Farhan Ryanda Imran",
        nik: "12331221321312",
        nkk: "111111111111111111",
        id_pel: "00000000001",
        no_hp: "081280524466",
        alamat: "Perum Mustika Wanasari Cibitung",
        lokasi: "test",
        validasi: "valid",
        bukti_ktp:
          "https://bimamedia-gurusiana.ap-south-1.linodeobjects.com/099fe6b0b444c23836c4a5d07346082b/2021/04/20/l-img20210420015823jpg20210420005933.jpeg",
        bukti_meter:
          "https://images.tokopedia.net/img/cache/500-square/product-1/2020/8/24/6478312/6478312_678bc7e7-f495-43af-a85e-0eb799f55b3f_960_960.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Firdaus",
        nik: "99999999999999",
        nkk: "12222222222222221",
        id_pel: "00000000002",
        no_hp: "081238273822",
        alamat: "Perum Cawang Bogor",
        lokasi: "test",
        validasi: "tidak valid",
        bukti_ktp:
          "https://bimamedia-gurusiana.ap-south-1.linodeobjects.com/099fe6b0b444c23836c4a5d07346082b/2021/04/20/l-img20210420015823jpg20210420005933.jpeg",
        bukti_meter:
          "https://asset-a.grid.id/crop/0x0:0x0/x/photo/2023/05/08/rsz_kode_rahasia_meteran_listrik-20230508023457.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Mamad",
        nik: "8888888888888",
        nkk: "19233333333322",
        id_pel: "00000000003",
        no_hp: "081284223423",
        alamat: "Perum Kolam Semarang",
        lokasi: "test",
        validasi: "valid",
        bukti_ktp:
          "https://bimamedia-gurusiana.ap-south-1.linodeobjects.com/099fe6b0b444c23836c4a5d07346082b/2021/04/20/l-img20210420015823jpg20210420005933.jpeg",
        bukti_meter:
          "https://asset.kompas.com/crops/EJOBChzKY0jyOaSZGiIrzRLHFzQ=/0x0:780x520/750x500/data/photo/2023/07/21/64ba44fe2c9c3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
