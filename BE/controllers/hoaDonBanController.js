const HoaDonBan = require("../models/hoaDonBanModel");
const CTHoaDonBan = require("../models/ctHoaDonBanModel");
const SanPham = require("../models/sanPhamModel");
const NguoiDung = require("../models/nguoiDungModel");
const { Op } = require("sequelize");

exports.getAll = async (req, res) => {
  try {
    const hoaDonBans = await HoaDonBan.findAll({
      include: [
        {
          model: NguoiDung,
          as: "NguoiDung",
          attributes: ["tenND", "sdt", "email", "diaChi"],
        },
        {
          model: CTHoaDonBan,
          as: "CTHoaDonBans",
          include: [
            {
              model: SanPham,
              as: "SanPham",
              attributes: ["tenSP", "anhSP"],
            },
          ],
        },
      ],
    });

    res.status(200).json(hoaDonBans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const hoaDonBan = await HoaDonBan.findByPk(id, {
      include: [
        {
          model: NguoiDung,
          as: "NguoiDung",
          attributes: ["tenND", "sdt", "email", "diaChi"],
        },
        {
          model: CTHoaDonBan,
          as: "CTHoaDonBans",
          include: [
            {
              model: SanPham,
              as: "SanPham",
              attributes: ["tenSP", "anhSP"],
            },
          ],
        },
      ],
    });

    if (!hoaDonBan) {
      return res.status(404).json({ error: "Hóa đơn bán không tồn tại" });
    }

    res.status(200).json(hoaDonBan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCTHDB = async (req, res) => {
  try {
    const chiTietHoaDonBans = await CTHoaDonBan.findAll({
      include: [
        {
          model: SanPham,
          as: "SanPham",
          attributes: ["tenSP", "anhSP"],
        },
      ],
    });

    res.status(200).json(chiTietHoaDonBans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByIdCTHDB = async (req, res) => {
  try {
    const chiTietHoaDonBan = await CTHoaDonBan.findByPk(req.params.id, {
      include: [
        {
          model: SanPham,
          as: "SanPham",
          attributes: ["tenSP", "anhSP"],
        },
      ],
    });

    if (!chiTietHoaDonBan) {
      return res.status(404).json({ error: "Chi tiết hóa đơn không tồn tại" });
    }

    res.status(200).json(chiTietHoaDonBan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.insert = async (req, res) => {
  try {
    const { maHDB, ngayBan, giamGia, phuongThuc, maND, CTHoaDonBans } =
      req.body;
    let hoaDonBan;

    if (maHDB) {
      hoaDonBan = await HoaDonBan.findByPk(maHDB, {
        include: [{ model: CTHoaDonBan, as: "CTHoaDonBans" }],
      });

      if (!hoaDonBan) {
        return res.status(404).json({ error: "Hóa đơn bán không tồn tại" });
      }
    } else {
      if (!ngayBan || !phuongThuc || !maND) {
        return res
          .status(400)
          .json({ error: "Thiếu thông tin bắt buộc để tạo hóa đơn bán" });
      }

      hoaDonBan = await HoaDonBan.create({
        ngayBan,
        trangThai: "Chờ duyệt",
        giamGia: giamGia || 0,
        tongTien: 0,
        phuongThuc,
        maND,
      });
    }

    if (CTHoaDonBans && Array.isArray(CTHoaDonBans)) {
      await Promise.all(
        CTHoaDonBans.map(async (chiTiet) => {
          const sanPham = await SanPham.findByPk(chiTiet.maSP);
          if (!sanPham) {
            throw new Error(`Sản phẩm ${chiTiet.maSP} không tồn tại`);
          }

          if (sanPham.soLuong < chiTiet.soLuong) {
            throw new Error(
              `Sản phẩm ${sanPham.tenSP} không đủ hàng trong kho`
            );
          }

          await sanPham.decrement("soLuong", { by: chiTiet.soLuong });

          await CTHoaDonBan.create({
            maSP: chiTiet.maSP,
            maHDB: hoaDonBan.maHDB,
            soLuong: chiTiet.soLuong,
            donGia: sanPham.giaTien,
            thanhTien: chiTiet.soLuong * sanPham.giaTien,
          });
        })
      );
    }

    const tongTienMoi = await CTHoaDonBan.sum("thanhTien", {
      where: { maHDB: hoaDonBan.maHDB },
    });
    const tongTienSauGiam = Math.max(tongTienMoi - (hoaDonBan.giamGia || 0), 0);
    await hoaDonBan.update({ tongTien: tongTienSauGiam });

    const updatedHoaDonBan = await HoaDonBan.findByPk(hoaDonBan.maHDB, {
      include: [
        {
          model: CTHoaDonBan,
          as: "CTHoaDonBans",
          include: [
            { model: SanPham, as: "SanPham", attributes: ["tenSP", "anhSP"] },
          ],
        },
        {
          model: NguoiDung,
          as: "NguoiDung",
          attributes: ["tenND", "sdt", "email", "diaChi"],
        },
      ],
    });

    res.status(201).json(updatedHoaDonBan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { maHDB, ngayBan, giamGia, phuongThuc, maND, maKH, CTHoaDonBans } =
      req.body;

    const hoaDonBan = await HoaDonBan.findByPk(maHDB, {
      include: [{ model: CTHoaDonBan, as: "CTHoaDonBans" }],
    });

    if (!hoaDonBan) {
      return res.status(404).json({ error: "Hóa đơn bán không tồn tại" });
    }

    await hoaDonBan.update({ ngayBan, giamGia, phuongThuc, maND, maKH });

    let tongTienMoi = 0;

    if (CTHoaDonBans && Array.isArray(CTHoaDonBans)) {
      await Promise.all(
        CTHoaDonBans.map(async (chiTiet) => {
          const sanPham = await SanPham.findByPk(chiTiet.maSP);
          if (!sanPham) return;

          const donGia = sanPham.giaBan; // Lấy giá bán
          const chiTietHDB = await CTHoaDonBan.findOne({
            where: { maSP: chiTiet.maSP, maHDB },
          });

          if (chiTietHDB) {
            // **Cập nhật số lượng sản phẩm trong kho**
            const chenhLechSoLuong = chiTiet.soLuong - chiTietHDB.soLuong;
            if (chenhLechSoLuong > 0) {
              // Tăng số lượng -> Giảm hàng trong kho
              if (sanPham.soLuong < chenhLechSoLuong) {
                throw new Error(
                  `Sản phẩm ${sanPham.tenSP} không đủ hàng trong kho`
                );
              }
              await sanPham.decrement("soLuong", { by: chenhLechSoLuong });
            } else if (chenhLechSoLuong < 0) {
              // Giảm số lượng -> Cộng lại hàng trong kho
              await sanPham.increment("soLuong", {
                by: Math.abs(chenhLechSoLuong),
              });
            }

            // **Cập nhật chi tiết hóa đơn**
            await chiTietHDB.update({
              soLuong: chiTiet.soLuong,
              thanhTien: chiTiet.soLuong * donGia,
            });
          } else {
            // **Thêm sản phẩm mới vào hóa đơn -> Giảm số lượng trong kho**
            if (sanPham.soLuong < chiTiet.soLuong) {
              throw new Error(
                `Sản phẩm ${sanPham.tenSP} không đủ hàng trong kho`
              );
            }
            await sanPham.decrement("soLuong", { by: chiTiet.soLuong });

            await CTHoaDonBan.create({
              maSP: chiTiet.maSP,
              maHDB: maHDB,
              soLuong: chiTiet.soLuong,
              donGia,
              thanhTien: chiTiet.soLuong * donGia,
            });
          }
        })
      );
    }

    // **Xóa sản phẩm bị loại khỏi hóa đơn và hoàn lại kho**
    const maSPTrongHoaDon = CTHoaDonBans.map((chiTiet) => chiTiet.maSP);
    const chiTietHDBDaCo = await CTHoaDonBan.findAll({ where: { maHDB } });

    await Promise.all(
      chiTietHDBDaCo.map(async (chiTiet) => {
        if (!maSPTrongHoaDon.includes(chiTiet.maSP)) {
          const sanPham = await SanPham.findByPk(chiTiet.maSP);
          if (sanPham) {
            await sanPham.increment("soLuong", { by: chiTiet.soLuong });
          }
          await chiTiet.destroy();
        }
      })
    );

    // **Cập nhật tổng tiền hóa đơn**
    tongTienMoi = await CTHoaDonBan.sum("thanhTien", { where: { maHDB } });
    const tongTienSauGiam = Math.max(tongTienMoi - (giamGia || 0), 0);
    await hoaDonBan.update({ tongTien: tongTienSauGiam });

    const updatedHoaDonBan = await HoaDonBan.findByPk(maHDB, {
      include: [{ model: CTHoaDonBan, as: "CTHoaDonBans" }],
    });

    res.status(200).json(updatedHoaDonBan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra chi tiết hóa đơn bán
    const chiTiet = await CTHoaDonBan.findByPk(id);
    if (chiTiet) {
      const sanPham = await SanPham.findByPk(chiTiet.maSP);
      if (sanPham) {
        // Cộng lại số lượng
        await sanPham.increment("soLuong", { by: chiTiet.soLuong });
      }
      await chiTiet.destroy();
      return res.status(200).json(chiTiet);
    }

    // Kiểm tra hóa đơn bán
    const hoaDonBan = await HoaDonBan.findByPk(id, {
      include: [{ model: CTHoaDonBan, as: "CTHoaDonBans" }],
    });

    if (!hoaDonBan) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy hóa đơn bán hoặc chi tiết" });
    }

    // Cộng lại số lượng cho từng sản phẩm
    await Promise.all(
      hoaDonBan.CTHoaDonBans.map(async (chiTiet) => {
        const sanPham = await SanPham.findByPk(chiTiet.maSP);
        if (sanPham) {
          await sanPham.increment("soLuong", { by: chiTiet.soLuong });
        }
      })
    );

    const hoaDonBanCopy = JSON.parse(JSON.stringify(hoaDonBan));
    await CTHoaDonBan.destroy({ where: { maHDB: id } });
    await hoaDonBan.destroy();

    return res.status(200).json(hoaDonBanCopy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        error: "Vui lòng nhập giá trị tìm kiếm (ngày bán hoặc mã sản phẩm).",
      });
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(q)) {
      const hoaDonBans = await HoaDonBan.findAll({
        where: { ngayBan: { [Op.eq]: new Date(q) } },
        include: [{ model: CTHoaDonBan, as: "CTHoaDonBans" }],
      });

      return res.status(200).json(hoaDonBans);
    }

    const chiTietHDBs = await CTHoaDonBan.findAll({
      where: { maSP: q },
    });

    return res.status(200).json(chiTietHDBs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
