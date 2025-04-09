import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { getUserById } from "../../../services/nguoiDungService";
import { getProductById } from "../../../services/sanPhamService";
import {
  deleteImprot,
  getAllImport,
  getImportById,
} from "../../../services/hoaDonNhapService";
import { getSupplierById } from "../../../services/nhaCungCapAdmin";

function HoaDonNhapAdmin() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/dang-nhap");
  }

  const [imports, setImports] = useState([]);
  const [users, setUsers] = useState({});
  const [products, setProducts] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [selectedImport, setSelectedImport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const data = await getAllImport();
        setImports(data);
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
    imports.forEach((imp) => {
      if (imp.maND) {
        fetchUserDetails(imp.maND);
      }
    });
  }, [imports]);

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
    imports.forEach((imp) => {
      imp.CTHoaDonNhaps.forEach((item) => {
        if (item.maSP) {
          fetchProductDetails(item.maSP);
        }
      });
    });
  }, [imports]);

  // Lấy thông tin phân phối theo maNCC
  useEffect(() => {
    const fetchSupplierDetails = async (maNCC) => {
      try {
        const supplier = await getSupplierById(maNCC);
        console.log("ncc", supplier);
        setSupplier((prevSupplier) => ({
          ...prevSupplier,
          [maNCC]: supplier,
        }));
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    //
    imports.forEach((imp) => {
      if (imp.maNCC) {
        fetchSupplierDetails(imp.maNCC);
      }
    });
  }, [imports]);

  const handleViewDetails = async (maHDN) => {
    try {
      const importDetail = await getImportById(maHDN);
      setSelectedImport(importDetail);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách chi tiết hóa đơn:", error);
    }
  };

  const handleDeleteImport = async (id) => {
    try {
      const data = await deleteImprot(id);

      if (data.CTHoaDonNhaps) {
        // xóa hóa đơn
        setImports((prev) => prev.filter((imp) => imp.maHDN !== id));
        setSelectedImport(null);
      } else {
        //  xóa chi tiết hóa đơn
        const updated = await getImportById(selectedImport.maHDN);

        setImports((prev) =>
          prev.map((imp) => (imp.maHDN === updated.maHDN ? updated : imp))
        );

        setSelectedImport(updated);
      }
      if (window.location.pathname === "/don-nhap-admin") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Lỗi khi xóa hóa đơn:", error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = imports.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(imports.length / recordsPerPage);

  return (
    <div className="container-fluid mt-1">
      <h3 className="mb-5 mt-2 text-center">Danh sách đơn hàng xuất</h3>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <button className="btn-add">
          <i className="bi bi-file-earmark-plus"></i> Thêm danh mục
        </button>

        <div className="quanly-center">
          <form className="search-form">
            <input
              type="search"
              className="search-input"
              placeholder="Tìm kiếm thông tin ...."
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
            <th>Nhân viên</th>
            <th>Ngày nhập</th>
            <th>Phân phối</th>
            {/* <th>Giảm giá</th> */}
            <th>Điện thoại PP</th>
            <th>Địa chỉ PP</th>
            <th>Tổng tiền</th>
            <th colSpan={2}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((imp) => (
            <tr key={imp.maHDN}>
              <td>{users[imp.maND]?.tenND}</td>
              <td>{imp.ngayNhap}</td>
              <td>{supplier[imp.maNCC]?.tenNCC}</td>
              {/* <td>{imp.giamGia}đ</td> */}
              <td>{supplier[imp.maNCC]?.sdt}</td>
              <td>{supplier[imp.maNCC]?.diaChi}</td>
              <td>{imp.tongTien}đ</td>
              <td>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleDeleteImport(imp.maHDN)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#billDetailModal"
                  onClick={() => handleViewDetails(imp.maHDN)}
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
                  {selectedImport &&
                    selectedImport.CTHoaDonNhaps.map((detail, index) => (
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
                            onClick={() => handleDeleteImport(detail.ma_CTHDN)}
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
