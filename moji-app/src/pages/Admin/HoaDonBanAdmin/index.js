import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useRef, useState } from "react";
import {
  deleteBill,
  getAllBill,
  getBillById,
  searchBill,
  updateBill,
} from "../../../services/hoaDonBanService";
import { getUserById } from "../../../services/nguoiDungService";
import { getProductById } from "../../../services/sanPhamService";

function HoaDonBanAdmin() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/dang-nhap");
  }

  const [bills, setBills] = useState([]);
  const [users, setUsers] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchTimeoutRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const data = await getAllBill();
        setBills(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách hóa đơn:", error);
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
      if (window.location.pathname === "/don-nhap-admin") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Lỗi khi xóa hóa đơn:", error);
    }
  };
  // if (!data.CTHoaDonBans || data.CTHoaDonBans.length === 0) {
  //   // Đã xóa toàn bộ hóa đơn
  //   setBills((prev) => prev.filter((bill) => bill.maHDB !== id));
  //   setSelectedBill(null);
  // } else {
  //   // Chỉ xóa 1 chi tiết hóa đơn
  //   const updated = await getBillById(selectedBill.maHDB);
  //   setBills((prev) =>
  //     prev.map((bill) => (bill.maHDB === updated.maHDB ? updated : bill))
  //   );
  //   setSelectedBill(updated);
  // }

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

  const handleSearch = async (query) => {
    try {
      const data = await searchBill(query);
      setBills(data);
    } catch (error) {
      console.log("lỗi tìm kiếm nhà cung cấp: ", error);
    }
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        handleSearch(searchQuery);
      } else {
        getAllBill().then(setBills);
      }
    }, 300);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = bills.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(bills.length / recordsPerPage);

  return (
    <div className="container-fluid mt-1">
      <h3 className="mb-5 mt-2 text-center title-text-main ">
        Danh sách đơn hàng xuất
      </h3>
      <div className="d-flex justify-content-end mb-2">
        <div className="quanly-center">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              className="search-input"
              placeholder="Tìm kiếm thông tin ...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">
              <i className="bi bi-search"></i>
            </span>
          </form>
        </div>
      </div>
      {/* new Date(....).toLocaleDateString(vi-VN) */}
      <table className="table table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Ngày đặt</th>
            <th>Khách hàng</th>
            {/* <th>Giảm giá</th> */}
            <th>Điện thoại</th>
            <th>Địa chỉ</th>
            <th>Email</th>
            <th>Tổng tiền</th>
            {/* <th>Ghi chú</th> */}
            <th>Trạng thái</th>
            <th colSpan={2}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((bill) => (
            <tr key={bill.maHDB}>
              <td>{bill.ngayBan}</td>
              <td>{users[bill.maND]?.tenND}</td>
              {/* <td>{bill.giamGia}đ</td> */}
              <td>{users[bill.maND]?.sdt}</td>
              <td>{users[bill.maND]?.diaChi}</td>
              <td>{users[bill.maND]?.email}</td>
              <td>{bill.tongTien}đ</td>
              {/* <td>{bill.ghiChu}</td> */}

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
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        {/* Select số bản ghi */}
        <div className="d-flex align-items-center">
          <label className="me-2 fw-semibold">Hiển thị:</label>
          <select
            className="form-select w-auto"
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        {/* Phân trang */}
        <nav>
          <ul className="pagination-container">
            {currentPage > 1 && (
              <li>
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  &laquo;
                </button>
              </li>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(currentPage - 2, 0),
                Math.min(currentPage + 1, totalPages)
              )
              .map((page) => (
                <li key={page}>
                  <button
                    className={`pagination-btn ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}

            {currentPage < totalPages && (
              <li>
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  &raquo;
                </button>
              </li>
            )}
          </ul>
        </nav>
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

export default HoaDonBanAdmin;
