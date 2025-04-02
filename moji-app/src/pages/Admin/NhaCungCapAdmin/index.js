import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NhaCungCapAdmin.scss";
import { useEffect, useState } from "react";
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  updateSupplier,
} from "../../../services/nhaCungCapAdmin";
function NhaCungCapAdmin() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/dang-nhap");
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState({
    tenNCC: "",
    diaChi: "",
    sdt: "",
    email: "",
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getAllSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà cung cấp:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setFormData({ ...supplier });
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const data = await createSupplier(formData);
      setSuppliers((prev) => [...prev, data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm nhà cung cấp:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedSupplier) return;
    try {
      await updateSupplier({ ...formData, maNCC: selectedSupplier.maNCC });
      setSuppliers((prev) =>
        prev.map((sup) =>
          sup.maNCC === selectedSupplier.maNCC ? { ...sup, ...formData } : sup
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật nhà cung cấp:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((sup) => sup.maNCC !== id));
    } catch (error) {
      console.error("Lỗi khi xóa nhà cung cấp:", error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = suppliers.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(suppliers.length / recordsPerPage);

  return (
    <div className="container-fluid mt-1">
      <h3 className="mb-3 mt-2 text-center">Danh sách nhà cung cấp</h3>
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
        <button
          className="btn-add"
          onClick={() => {
            setSelectedSupplier(null);
            setModalOpen(true);
          }}
        >
          <i className="bi bi-file-earmark-plus"></i> Thêm nhà cung cấp
        </button>
      </div>

      <table className="table table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Mã NCC</th>
            <th>Tên NCC</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((supplier) => (
            <tr key={supplier.maNCC}>
              <td>{supplier.maNCC}</td>
              <td>{supplier.tenNCC}</td>
              <td>{supplier.diaChi}</td>
              <td>{supplier.sdt}</td>
              <td>{supplier.email}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditClick(supplier)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(supplier.maNCC)}
                >
                  <i className="bi bi-trash"></i>
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

      {modalOpen && (
        <div className="nhacungcap-admin-modal">
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close-btn" onClick={() => setModalOpen(false)}>
                <i className="bi bi-x-circle"></i>
              </span>
              <h3 className="mt-5 mb-4">
                {selectedSupplier ? "Cập nhật thông tin" : "Thêm mới thông tin"}
              </h3>
              <div className="form-group">
                <input
                  type="text"
                  id="tenNCC"
                  className="form-control"
                  placeholder="Tên nhà cung cấp"
                  value={formData.tenNCC}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="diaChi"
                  className="form-control"
                  placeholder="Địa chỉ"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="sdt"
                  className="form-control"
                  placeholder="Số điện thoại"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>

              <button
                className="btn-save"
                onClick={selectedSupplier ? handleUpdate : handleSubmit}
              >
                <i className="bi bi-save"></i> Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NhaCungCapAdmin;
