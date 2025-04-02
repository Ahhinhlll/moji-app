const HoaDonNhap = require("../models/hoaDonNhapModel");
const CTHoaDonNhap = require("../models/ctHoaDonNhapModel");
const SanPham = require("../models/sanPhamModel");

const { Op } = require("sequelize");

exports.getAll = async (req, res) => {
  try {
    const hoaDonNhaps = await HoaDonNhap.findAll({
      include: [{ model: CTHoaDonNhap, as: "CTHoaDonNhaps" }],
    });

    res.status(200).json(hoaDonNhaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const hoaDonNhap = await HoaDonNhap.findByPk(id, {
      include: [{ model: CTHoaDonNhap, as: "CTHoaDonNhaps" }],
    });

    if (!hoaDonNhap) {
      return res.status(404).json({ error: "Hóa đơn nhập không tồn tại" });
    }

    res.status(200).json(hoaDonNhap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.insert = async (req, res) => {
  try {
    const { maHDN, ngayNhap, giamGia, phuongThuc, maND, maNCC, CTHoaDonNhaps } =
      req.body;
    let hoaDonNhap;

    if (maHDN) {
      //
      hoaDonNhap = await HoaDonNhap.findByPk(maHDN, {
        include: [{ model: CTHoaDonNhap, as: "CTHoaDonNhaps" }],
      });

      if (!hoaDonNhap) {
        return res.status(404).json({ error: "Hóa đơn nhập không tồn tại" });
      }
    } else {
      // không có maHDN, tạo hóa đơn mới
      if (!ngayNhap || !phuongThuc || !maND || !maNCC) {
        return res
          .status(400)
          .json({ error: "Thiếu thông tin bắt buộc để tạo hóa đơn nhập" });
      }

      hoaDonNhap = await HoaDonNhap.create({
        ngayNhap,
        giamGia: giamGia || 0,
        tongTien: 0,
        phuongThuc,
        maND,
        maNCC,
      });
    }

    // danh sách chi tiết thêm vào bảng CTHoaDonNhap
    if (CTHoaDonNhaps && Array.isArray(CTHoaDonNhaps)) {
      await Promise.all(
        CTHoaDonNhaps.map(async (chiTiet) => {
          // Kiểm tra sản phẩm có tồn tại không
          const sanPham = await SanPham.findByPk(chiTiet.maSP);
          if (!sanPham) {
            throw new Error(`Sản phẩm ${chiTiet.maSP} không tồn tại`);
          }
          // Kiểm tra giá nhập < giá sản phẩm
          if (chiTiet.donGia >= sanPham.giaTien) {
            throw new Error(
              `Giá nhập (${chiTiet.donGia}) phải nhỏ hơn giá hiện tại của sản phẩm (${sanPham.gia})`
            );
          }
          // Thêm chi tiết hóa đơn nhập
          await CTHoaDonNhap.create({
            maSP: chiTiet.maSP,
            maHDN: hoaDonNhap.maHDN,
            soLuong: chiTiet.soLuong,
            donGia: chiTiet.donGia,
            thanhTien: chiTiet.soLuong * chiTiet.donGia,
          });

          // Cập nhật số lượng sản phẩm trong bảng SanPham
          await sanPham.increment("soLuong", { by: chiTiet.soLuong });
        })
      );
    }

    //  tổng tiền sau khi thêm chi tiết
    const tongTienMoi = await CTHoaDonNhap.sum("thanhTien", {
      where: { maHDN: hoaDonNhap.maHDN },
    });
    const tongTienSauGiam = Math.max(
      tongTienMoi - (hoaDonNhap.giamGia || 0),
      0
    );

    await hoaDonNhap.update({ tongTien: tongTienSauGiam });

    //
    const updatedHoaDonNhap = await HoaDonNhap.findByPk(hoaDonNhap.maHDN, {
      include: [{ model: CTHoaDonNhap, as: "CTHoaDonNhaps" }],
    });

    res.status(201).json(updatedHoaDonNhap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { maHDN, ngayNhap, giamGia, phuongThuc, maND, maNCC, CTHoaDonNhaps } =
      req.body;
    //
    const hoaDonNhap = await HoaDonNhap.findByPk(maHDN, {
      include: [{ model: CTHoaDonNhap, as: "CTHoaDonNhaps" }],
    });

    if (!hoaDonNhap) {
      return res.status(404).json({ error: "Hóa đơn nhập không tồn tại" });
    }

    // Cập nhật thông tin
    await hoaDonNhap.update({
      ngayNhap,
      giamGia,
      phuongThuc,
      maND,
      maNCC,
    });

    // có danh sách chi tiết cập nhật từng mục
    if (CTHoaDonNhaps && Array.isArray(CTHoaDonNhaps)) {
      await Promise.all(
        CTHoaDonNhaps.map(async (chiTiet) => {
          const { ma_CTHDN, maSP, soLuong, donGia } = chiTiet;
          //
          const chiTietHDN = await CTHoaDonNhap.findOne({
            where: { ma_CTHDN, maHDN },
          });

          if (chiTietHDN) {
            const chenhLechSoLuong = soLuong - chiTietHDN.soLuong;
            // Cập nhật chi tiết
            await chiTietHDN.update({
              maSP,
              soLuong,
              donGia,
              thanhTien: soLuong * donGia,
            });

            // Cập nhật số lượng sản phẩm trong bảng SanPham
            const sanPham = await SanPham.findByPk(maSP);
            if (sanPham) {
              await sanPham.increment("soLuong", { by: chenhLechSoLuong });
            }
          }
        })
      );
    }

    const tongTienMoi = await CTHoaDonNhap.sum("thanhTien", {
      where: { maHDN },
    });
    const tongTienSauGiam = Math.max(tongTienMoi - (giamGia || 0), 0);
    await hoaDonNhap.update({ tongTien: tongTienSauGiam });

    //
    const updatedHoaDonNhap = await HoaDonNhap.findByPk(maHDN, {
      include: [{ model: CTHoaDonNhap, as: "CTHoaDonNhaps" }],
    });

    res.status(200).json(updatedHoaDonNhap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    // mã của chi tiết hóa đơn
    const chiTiet = await CTHoaDonNhap.findByPk(id);
    if (chiTiet) {
      const sanPham = await SanPham.findByPk(chiTiet.maSP);

      if (sanPham) {
        await sanPham.decrement("soLuong", { by: chiTiet.soLuong });
        const soLuongConLai = sanPham.soLuong - chiTiet.soLuong;

        if (soLuongConLai > 0) {
          const lanNhapGanNhat = await CTHoaDonNhap.findOne({
            where: { maSP: sanPham.maSP, ma_CTHDN: { [Op.ne]: id } },
            order: [["createdAt", "DESC"]],
          });

          if (lanNhapGanNhat) {
            await sanPham.update({ giaNhap: lanNhapGanNhat.donGia });
          }
        } else {
          await sanPham.update({ giaNhap: null });
        }
      }
      await chiTiet.destroy();
      return res.status(200).json(chiTiet);
    }

    // kiểm tra xem có phải hóa đơn nhập không
    const hoaDonNhap = await HoaDonNhap.findByPk(id, {
      include: [{ model: CTHoaDonNhap, as: "CTHoaDonNhaps" }],
    });

    if (!hoaDonNhap) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy hóa đơn nhập hoặc chi tiết" });
    }

    await Promise.all(
      hoaDonNhap.CTHoaDonNhaps.map(async (chiTiet) => {
        const sanPham = await SanPham.findByPk(chiTiet.maSP);
        if (sanPham) {
          await sanPham.decrement("soLuong", { by: chiTiet.soLuong });

          const soLuongConLai = sanPham.soLuong - chiTiet.soLuong;
          if (soLuongConLai > 0) {
            const lanNhapGanNhat = await CTHoaDonNhap.findOne({
              where: {
                maSP: sanPham.maSP,
                ma_CTHDN: { [Op.ne]: chiTiet.ma_CTHDN },
              },
              order: [["createdAt", "DESC"]],
            });
            if (lanNhapGanNhat) {
              await sanPham.update({ giaNhap: lanNhapGanNhat.donGia });
            }
          } else {
            await sanPham.update({ giaNhap: null });
          }
        }
      })
    );
    const hoaDonNhapCopy = JSON.parse(JSON.stringify(hoaDonNhap));
    await CTHoaDonNhap.destroy({ where: { maHDN: id } });
    await hoaDonNhap.destroy();

    return res.status(200).json(hoaDonNhapCopy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        error: "Vui lòng nhập giá trị tìm kiếm (ngày nhập hoặc mã sản phẩm).",
      });
    }

    // q là ngày (YYYY-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}$/.test(q)) {
      const hoaDonNhaps = await HoaDonNhap.findAll({
        where: { ngayNhap: { [Op.eq]: new Date(q) } },
        include: [{ model: CTHoaDonNhap, as: "CTHoaDonNhaps" }],
      });

      return res.status(200).json(hoaDonNhaps);
    }

    // Nếu q không phải ngày, giả định nó là mã sản phẩm
    const chiTietHDNs = await CTHoaDonNhap.findAll({
      where: { maSP: q },
    });

    return res.status(200).json(chiTietHDNs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
