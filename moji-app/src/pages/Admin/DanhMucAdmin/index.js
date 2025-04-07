import { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategory,
  getCategoryById,
} from "./../../../services/danhMucService";

function DanhMucAdmin() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/dang-nhap");
  }

  const [category, setCategory] = useState([]);
  const [selectedCate, setSelectedCate] = useState(null);
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
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
          >
            <option value={5}>5 bản ghi/trang</option>
            <option value={10}>10 bản ghi/trang</option>
            <option value={15}>15 bản ghi/trang</option>
          </select>
        </div>

        <button className="btn-add" onClick={() => {}}>
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
                  data-bs-target="#billDetailModal"
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
                    <th colSpan={2}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCate &&
                    selectedCate.CTDanhMucs.map((detail, index) => (
                      <tr key={index}>
                        <td>{detail.ma_CTDM}</td>
                        <td>{detail.tenCTDM}</td>
                        <td className="text-center">
                          <button className="btn btn-warning me-2">
                            <i className="bi bi-pencil-square"></i>
                          </button>
                        </td>
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
    </div>
  );
}
export default DanhMucAdmin;
