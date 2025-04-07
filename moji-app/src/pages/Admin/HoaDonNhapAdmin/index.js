import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import {
  deleteBill,
  getAllBill,
  getBillById,
  updateBill,
} from "../../../services/hoaDonBanService";
import { getUserById } from "../../../services/nguoiDungService";
import { getProductById } from "../../../services/sanPhamService";

function HoaDonNhapAdmin() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/dang-nhap");
  }

  const [bills, setBills] = useState([]);
  const [users, setUsers] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const data = await getAllBill();
        setBills(data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách hóa đơn:", error);
        setLoading(false);
      }
    };
    fetchBills();
  }, []);
  // Lấy thông tin người dùng theo maND
  useEffect(() => {
    const fetchUserDetails = async (maND) => {
      try {
        const user = await getUserById(maND);
        setUsers((prevUsers) => ({
          ...prevUsers,
          [maND]: user,
        }));
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    //
    bills.forEach((bill) => {
      if (bill.maND) {
        fetchUserDetails(bill.maND);
      }
    });
  }, [bills]);

  // Lấy thông tin sản phẩm theo maSP
  useEffect(() => {
    const fetchProductDetails = async (maSP) => {
      try {
        const product = await getProductById(maSP);
        setProducts((prevProducts) => ({
          ...prevProducts,
          [maSP]: product,
        }));
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    //
    bills.forEach((bill) => {
      bill.CTHoaDonBans.forEach((item) => {
        if (item.maSP) {
          fetchProductDetails(item.maSP);
        }
      });
    });
  }, [bills]);

  const handleViewDetails = async (maHDB) => {
    try {
      const billDetail = await getBillById(maHDB);
      setSelectedBill(billDetail);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách chi tiết hóa đơn:", error);
    }
  };
  const handleDeleteBill = async (id) => {
    try {
      const data = await deleteBill(id);

      if (data.CTHoaDonBans) {
        // xóa hóa đơn
        setBills((prev) => prev.filter((bill) => bill.maHDB !== id));
        setSelectedBill(null);
      } else {
        //  xóa chi tiết hóa đơn
        const updated = await getBillById(selectedBill.maHDB);

        setBills((prev) =>
          prev.map((bill) => (bill.maHDB === updated.maHDB ? updated : bill))
        );

        setSelectedBill(updated);
      }
    } catch (error) {
      console.error("Lỗi khi xóa hóa đơn:", error);
    }
  };

  const handleTrangThai = async (maHDB, newTrangThai) => {
    try {
      const updatedBill = await updateBill({ maHDB, trangThai: newTrangThai });
      setBills((prev) =>
        prev.map((bill) => (bill.maHDB === maHDB ? updatedBill : bill))
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái hóa đơn:", error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = bills.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(bills.length / recordsPerPage);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }
  return (
    <div className="container-fluid mt-1">
      <h3 className="mb-3 mt-2 text-center">Danh sách đơn hàng xuất</h3>
      <div className="mb-3">
        <select
          className="form-select w-auto"
          value={recordsPerPage}
          onChange={(e) => setRecordsPerPage(Number(e.target.value))}
        >
          <option value={5}>5 bản ghi/trang</option>
          <option value={10}>10 bản ghi/trang</option>
          <option value={15}>15 bản ghi/trang</option>
        </select>
      </div>
      {/* new Date(....).toLocaleDateString(vi-VN) */}
      <table className="table table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Ngày đặt</th>
            <th>Khách hàng</th>
            <th>Điện thoại</th>
            <th>Địa chỉ</th>
            <th>Email</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th colSpan={2}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((bill) => (
            <tr key={bill.maHDB}>
              <td>{bill.ngayBan}</td>
              <td>{users[bill.maND]?.tenND}</td>
              <td>{users[bill.maND]?.sdt}</td>
              <td>{users[bill.maND]?.diaChi}</td>
              <td>{users[bill.maND]?.email}</td>
              <td>{bill.tongTien}</td>
              <td>
                <select
                  className="form-select"
                  value={bill.trangThai}
                  onChange={(e) => handleTrangThai(bill.maHDB, e.target.value)}
                >
                  <option value="Chờ duyệt">Chờ duyệt</option>
                  <option value="Đã duyệt">Đã duyệt</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleDeleteBill(bill.maHDB)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#billDetailModal"
                  onClick={() => handleViewDetails(bill.maHDB)}
                >
                  <i className="bi bi-file-earmark-text"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`pagination-btn ${
              currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="modal" id="billDetailModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Chi tiết hóa đơn</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-bordered text-center align-middle">
                <thead>
                  <tr>
                    <th>Mã hàng</th>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Ảnh</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBill &&
                    selectedBill.CTHoaDonBans.map((detail, index) => (
                      <tr key={index}>
                        <td>{products[detail.maSP]?.code}</td>
                        <td>{products[detail.maSP]?.tenSP}</td>
                        <td>{detail.soLuong}</td>
                        <td>
                          <img
                            src={`http://localhost:3001${detail.SanPham.anhSP[0]}`}
                            alt="Sản phẩm"
                            width="60"
                            height="70"
                          />
                        </td>
                        <td>{detail.donGia}đ</td>
                        <td>{detail.thanhTien}đ</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteBill(detail.ma_CTHDB)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoaDonNhapAdmin;
