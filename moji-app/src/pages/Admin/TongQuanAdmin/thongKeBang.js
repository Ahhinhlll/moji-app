import { useEffect, useState } from "react";
import { getAllTop5SanPhamBanChay } from "../../../services/thongKeService";

function ThongKeBang() {
  const [sanPham, setSanPham] = useState([]);
  const donHang = [
    {
      maHDB: 1,
      ngayBan: "12/04/2025",
      nguoiDung: "Mai An",
      trangThai: "Hoàn thành",
      soLuong: 120,
    },
    {
      maHDB: 2,
      ngayBan: "13/04/2025",
      nguoiDung: "Quỳnh Lan",
      trangThai: "Chờ duyệt",
      soLuong: 10,
    },
    {
      maHDB: 3,
      ngayBan: "14/04/2025",
      nguoiDung: "Mai Lan",
      trangThai: "Đã hủy",
      soLuong: 130,
    },
    {
      maHDB: 4,
      ngayBan: "15/04/2025",
      nguoiDung: "Mai Hoa",
      trangThai: "Chờ duyệt",
      soLuong: 130,
    },
    {
      maHDB: 5,
      ngayBan: "16/04/2025",
      nguoiDung: "Hoài Thu",
      trangThai: "Đã hủy",
      soLuong: 130,
    },
  ];
  const getBadgeClass = (trangThai) => {
    switch (trangThai) {
      case "Hoàn thành":
        return "bg-success";
      case "Chờ duyệt":
        return "bg-warning text-dark";
      case "Đã hủy":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  useEffect(() => {
    const fetchSanPhamBanChay = async () => {
      try {
        const res = await getAllTop5SanPhamBanChay();
        if (res && res.AllTop5SanPhamBanChay) {
          setSanPham(res.AllTop5SanPhamBanChay);
        }
      } catch (error) {
        console.error("Lỗi thống kê sản phẩm bán chạy:", error);
      }
    };
    fetchSanPhamBanChay();
  }, []);
  return (
    <div className="row g-3">
      <div className="col-12 col-md-6">
        <div className="card">
          <div className="card-header">Đơn đặt hàng gần đây</div>
          <div className="table-responsive">
            <table className="table mb-0 align-middle">
              <thead>
                <tr>
                  <th>Ngày đặt</th>
                  <th>Khách hàng</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {donHang.map((donHang) => (
                  <tr key={donHang.maHDB}>
                    <td>{donHang.ngayBan}</td>
                    <td>{donHang.nguoiDung}</td>
                    <td>
                      <span
                        className={`badge ${getBadgeClass(donHang.trangThai)}`}
                      >
                        {donHang.trangThai}
                      </span>
                    </td>
                    <td className="text-center">{donHang.soLuong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="card">
          <div className="card-header">Sản phẩm bán chạy</div>
          <div className="table-responsive">
            <table className="table mb-0 align-middle">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Danh mục</th>
                  <th className="text-center">Đã bán</th>
                  <th className="text-center">Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                {sanPham.map((product) => (
                  <tr key={product.maSP}>
                    <td>{product.tenSP}</td>
                    <td>{product.tenCTDM}</td>
                    <td className="text-center">{product.soLuong}</td>
                    <td className="text-center">
                      {product.tongTien.toLocaleString()}đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ThongKeBang;
