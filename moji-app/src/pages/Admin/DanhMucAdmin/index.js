import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./DanhMuc.scss";

import {
  deleteCategory,
  getAllCategory,
  getCategoryById,
  insertCategory,
} from "./../../../services/danhMucService";

function DanhMucAdmin() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/dang-nhap");
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCate, setSelectedCate] = useState(null);
  const [newCateName, setNewcateName] = useState("");
  const [newCTDanhMucs, setNewCTDanhMucs] = useState([{ tenCTDM: "" }]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    const fetchCates = async () => {
      try {
        const data = await getAllCategory();
        console.log("danh mục :", data);
        setCategory(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách hóa đơn:", error);
      }
    };
    fetchCates();
  }, []);

  // Thêm chi tiết danh mục
  const addCTDanhMuc = () => {
    setNewCTDanhMucs([...newCTDanhMucs, { tenCTDM: "" }]);
  };

  // Xóa form chi tiết danh mục
  const removeCTDanhMuc = (index) => {
    const updated = [...newCTDanhMucs];
    updated.splice(index, 1);
    setNewCTDanhMucs(updated);
  };

  // Cập nhật khi người dùng nhập chi tiết
  const handleCTDanhMucChange = (index, value) => {
    const updated = [...newCTDanhMucs];
    updated[index].tenCTDM = value;
    setNewCTDanhMucs(updated);
  };

  // Hàm thêm danh mục mới
  const handleAddCategory = async () => {
    try {
      const body = {
        tenDM: newCateName,
        CTDanhMucs: newCTDanhMucs.filter((ct) => ct.tenCTDM.trim() !== ""),
      };

      const newData = await insertCategory(body);
      setCategory((prev) => [...prev, newData]);

      // Reset form
      setNewcateName("");
      setNewCTDanhMucs([{ tenCTDM: "" }]);
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  // xóa danh mục
  const handleDeleteCate = async (id) => {
    try {
      const data = await deleteCategory(id);
      if (data.CTDanhMucs) {
        // Xóa danh mục chính
        setCategory((prev) => prev.filter((cate) => cate.maDM !== id));
      } else {
        // Xóa chi tiết danh mục
        const updated = await getCategoryById(selectedCate.maDM);
        setCategory((prev) =>
          prev.map((cate) => (cate.maDM === updated.maDM ? updated : cate))
        );
        setSelectedCate(updated);
      }
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
    }
  };

  const handleViewDetails = async (ma_CTDM) => {
    try {
      const cateDetail = await getCategoryById(ma_CTDM);
      setSelectedCate(cateDetail);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách chi tiết hóa đơn:", error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = category.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(category.length / recordsPerPage);

  return (
    <div className="container-fluid mt-1">
      <h3 className="mb-3 mt-2 text-center">Danh sách loại hàng</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <select
            className="form-select w-auto"
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5 bản ghi/trang</option>
            <option value={10}>10 bản ghi/trang</option>
            <option value={15}>15 bản ghi/trang</option>
          </select>
        </div>

        <button className="btn-add" onClick={() => setModalOpen(true)}>
          <i className="bi bi-file-earmark-plus"></i> Thêm danh mục
        </button>
      </div>
      {/* new Date(....).toLocaleDateString(vi-VN) */}
      <table className="table table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Mã danh mục</th>
            <th>Tên danh mục</th>
            <th colSpan={3}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((cate) => (
            <tr key={cate.maDM}>
              <td>{cate.maDM}</td>
              <td>{cate.tenDM}</td>
              <td className="text-center">
                <button className="btn btn-warning me-2">
                  <i className="bi bi-pencil-square"></i>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleDeleteCate(cate.maDM)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#cateDetailModal"
                  onClick={() => handleViewDetails(cate.maDM)}
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
        {/* Nút lùi trang */}
        {currentPage > 1 && (
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &laquo;
          </button>
        )}

        {/* Hiển thị các nút trang tăng dần từ 1 đến currentPage (tối thiểu 3) */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(0, Math.max(3, currentPage))
          .map((page) => (
            <button
              key={page}
              className={`pagination-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

        {/* Nút tiến trang */}
        {currentPage < totalPages && (
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &raquo;
          </button>
        )}
      </div>

      <div className="modal" id="cateDetailModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Chi tiết danh mục</h5>
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
                    <th>Mã chi tiết</th>
                    <th>Danh mục chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCate &&
                    selectedCate.CTDanhMucs.map((detail, index) => (
                      <tr key={index}>
                        <td>{detail.ma_CTDM}</td>
                        <td>{detail.tenCTDM}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteCate(detail.ma_CTDM)}
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

      {modalOpen && (
        <div className="danhmuc-admin-modal">
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close-btn" onClick={() => setModalOpen(false)}>
                <i className="bi bi-x-circle"></i>
              </span>
              <h3 className="mt-5 mb-4">Thêm danh mục mới</h3>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên danh mục"
                  value={newCateName}
                  onChange={(e) => setNewcateName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Chi tiết danh mục:</label>
                {newCTDanhMucs.map((ct, index) => (
                  <div key={index} className="mb-2 d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      placeholder={`Chi tiết ${index + 1}`}
                      value={ct.tenCTDM}
                      onChange={(e) =>
                        handleCTDanhMucChange(index, e.target.value)
                      }
                    />
                    <button
                      className="btn btn-danger"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        height: "41px",
                      }}
                      onClick={() => removeCTDanhMuc(index)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                ))}
                <button className="btn btn-secondary" onClick={addCTDanhMuc}>
                  <i className="bi bi-plus"></i> Thêm chi tiết
                </button>
              </div>

              <button className="btn-save" onClick={handleAddCategory}>
                <i className="bi bi-save"></i> Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default DanhMucAdmin;
