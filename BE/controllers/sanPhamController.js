const SanPham = require("../models/sanPhamModel");
const CTDanhMuc = require("../models/ctDanhMucModel");
const Sequelize = require("../config/database");
const { Op } = require("sequelize");

exports.getAll = async (req, res) => {
  try {
    const sanPhams = await SanPham.findAll();
    res.status(200).json(sanPhams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const sanPham = await SanPham.findByPk(req.params.id);
    if (sanPham) {
      res.status(200).json(sanPham);
    } else {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.insert = async (req, res) => {
  try {
    const { tenSP, ma_CTDM, soLuong, giaTien, moTa, anhSP, mauSP, code } =
      req.body;
    const sanPham = await SanPham.create({
      tenSP,
      ma_CTDM,
      soLuong,
      giaTien,
      moTa,
      anhSP,
      mauSP,
      code,
    });
    res.status(201).json(sanPham);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { maSP, tenSP, ma_CTDM, soLuong, giaTien, moTa, anhSP, mauSP, code } =
      req.body;
    const sanPham = await SanPham.findByPk(maSP);
    if (sanPham !== null) {
      await sanPham.update({
        tenSP,
        ma_CTDM,
        soLuong,
        giaTien,
        moTa,
        anhSP,
        mauSP,
        code,
      });
      res.status(200).json(sanPham);
    } else {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const sanPham = await SanPham.findByPk(req.params.id);
    if (sanPham) {
      await sanPham.destroy();
      res.status(200).json(sanPham);
    } else {
      res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const keyword = req.query.q || "";

    const sanPhams = await SanPham.findAll({
      include: [
        {
          model: CTDanhMuc,
          as: "CTDanhMuc",
          required: false,
        },
      ],
      where: {
        [Op.or]: [
          { tenSP: { [Op.like]: `%${keyword}%` } },
          { ma_CTDM: { [Op.like]: `%${keyword}%` } },
          { soLuong: { [Op.like]: `%${keyword}%` } },
          { giaTien: { [Op.like]: `%${keyword}%` } },
          { mauSP: { [Op.like]: `%${keyword}%` } },
          Sequelize.where(Sequelize.col("CTDanhMuc.tenCTDM"), {
            [Op.like]: `%${keyword}%`,
          }),
        ],
      },
    });

    res.status(200).json(sanPhams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
