import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./HoaDon.scss";
import { useEffect, useState } from "react";
import { getAllBill, getBillById } from "../../../services/hoaDonBan";
import { getUserById } from "../../../services/nguoiDungService";
import { getProductById } from "../../../services/sanPhamService";

function HoaDonBanAdmin() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/dang-nhap");
  }

  const [bills, setBills] = useState([]);
  const [users, setUsers] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [selectedBill, setSelectedBill] = useState(null);
  const totalPages = 1;

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const data = await getAllBill(); // Giả sử đây là API để lấy danh sách hóa đơn
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

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }
  return (
    <div className="container-fluid mt-1">
      <h3 className="mb-3 mt-2 text-center">Danh sách đơn hàng xuất</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
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
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.maHDB}>
              <td>{new Date(bill.ngayBan).toLocaleDateString("vi-VN")}</td>
              <td>{users[bill.maND]?.tenND}</td>
              <td>{users[bill.maND]?.sdt}</td>
              <td>{users[bill.maND]?.diaChi}</td>
              <td>{users[bill.maND]?.email}</td>
              <td>{bill.tongTien}</td>
              <td>{bill.trangThai}</td>
              <td>
                <button className="btn btn-warning me-2">
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger me-2">
                  <i className="bi bi-trash"></i>
                </button>
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
                    <th>Mã SP</th>
                    <th>Tên sản phẩm</th>
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
                        <td>{detail.maSP}</td>
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
                          <button className="btn btn-danger">
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

export default HoaDonBanAdmin;
