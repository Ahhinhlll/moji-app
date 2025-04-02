const express = require("express");
const {
  getByIdCTHDB,
  getAllCTHDB,
  getAll,
  getById,
  insert,
  update,
  remove,
  search,
} = require("../controllers/hoaDonBanController");
const router = express.Router();

router.get("/hoadonban/getall", getAll);
router.get("/hoadonban/getbyid/:id", getById);
router.post("/hoadonban/insert", insert);
router.put("/hoadonban/update", update);
router.delete("/hoadonban/delete/:id", remove);
router.get("/hoadonban/search", search);

router.get("/cthoadonban/getall", getAllCTHDB);
router.get("/cthoadonban/getbyid/:id", getByIdCTHDB);

module.exports = router;
