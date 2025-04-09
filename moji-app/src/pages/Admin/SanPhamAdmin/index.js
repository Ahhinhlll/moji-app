import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./SanPhamAdmin.scss";
import { useEffect, useRef, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  searchProducts,
  updateProduct,
} from "../../../services/sanPhamService";
import {
  getAllCtCategory,
  getCtCategoryById,
} from "../../../services/danhMucService";

function SanPhamAdmin() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/dang-nhap");
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchTimeoutRef = useRef(null);
  const [formData, setFormData] = useState({
    tenSP: "",
    code: "",
    mauSP: "",
    moTa: "",
    soLuong: 0,
    giaTien: "",
    ma_CTDM: "",
    anhSP: [],
  });

  const resetFormData = () => {
    setFormData({
      tenSP: "",
      code: "",
      mauSP: "",
      moTa: "",
      soLuong: 0,
      giaTien: "",
      ma_CTDM: "",
      anhSP: [],
    });
  };

  // mở modal update
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      tenSP: product.tenSP,
      code: product.code,
      mauSP: product.mauSP,
      moTa: product.moTa,
      soLuong: product.soLuong,
      giaTien: product.giaTien,
      ma_CTDM: product.ma_CTDM,
      anhSP: product.anhSP,
    });
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            const category = await getCtCategoryById(product.ma_CTDM);
            return { ...product, tenCTDM: category.tenCTDM };
          })
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getAllCtCategory();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);
  const getCategoryName = (ma_CTDM) => {
    const category = categories.find((cat) => cat.ma_CTDM === ma_CTDM);
    return category ? category.tenCTDM : "Không xác định";
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const data = await createProduct(formData);
      setProducts((prevProducts) => [...prevProducts, data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;
    try {
      const updatedData = { ...formData, maSP: selectedProduct.maSP };

      await updateProduct(updatedData);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.maSP === selectedProduct.maSP
            ? { ...product, ...formData }
            : product
        )
      );

      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.maSP !== id)
      );
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const data = await searchProducts(query);
      console.log("tìm kiếm :", data);
      setProducts(data);
    } catch (error) {
      console.log("Lỗi tìm kiếm sản phẩm: ", error);
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
        getAllProducts().then(setProducts);
      }
    }, 300);
    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = products.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(products.length / recordsPerPage);

  const getProductImage = (imageArray) => {
    if (Array.isArray(imageArray) && imageArray.length > 0) {
      return `http://localhost:3001${imageArray[0]}`;
    }
    return "/image/default.jpg";
  };

  return (
    <div className="container-fluid mt-1">
      <h3 className="mb-5 mt-2 text-center">Danh sách sản phẩm</h3>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <button
          className="btn-add"
          onClick={() => {
            setSelectedProduct(null);
            resetFormData();
            setModalOpen(true);
          }}
        >
          <i className="bi bi-file-earmark-plus"></i> Thêm sản phẩm
        </button>

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

      <table className="table tb-sanPham table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Mã hàng</th>
            <th>Loại hàng</th>
            <th>Tên hàng</th>
            <th>Màu</th>
            <th>Ảnh</th>
            <th>Mô tả</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th colSpan={2}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((product) => (
            <tr key={product.maSP}>
              <td>{product.code}</td>
              <td>{getCategoryName(product.ma_CTDM)}</td>
              <td>{product.tenSP}</td>
              <td>{product.mauSP}</td>
              <td>
                <img
                  src={getProductImage(product.anhSP)}
                  alt={product.tenSP}
                  className="product-img"
                />
              </td>
              <td>{product.moTa}</td>
              <td>{product.soLuong}</td>
              <td>{product.giaTien?.toLocaleString()}đ</td>
              <td className="text-center">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditClick(product)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.maSP)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* phân trang */}
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

      {/* Modal */}
      {modalOpen && (
        <div className="sanpham-admin-modal">
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close-btn" onClick={() => setModalOpen(false)}>
                <i className="bi bi-x-circle"></i>
              </span>
              <h3 className="mt-5 mb-4">
                {selectedProduct ? "Cập nhật thông tin" : "Thêm mới thông tin"}
                {/* Thêm mới thông tin */}
              </h3>

              <div className="form-group">
                <input
                  type="text"
                  id="tenSP"
                  className="form-control"
                  placeholder="Tên sản phẩm"
                  onChange={handleInputChange}
                  value={formData.tenSP}
                />
              </div>

              <div className="form-group">
                <select
                  id="ma_CTDM"
                  className="form-control"
                  value={formData.ma_CTDM}
                  onChange={handleInputChange}
                >
                  <option value={0}>Chọn danh mục</option>
                  {categories.map((cat) => (
                    <option key={cat.ma_CTDM} value={cat.ma_CTDM}>
                      {cat.tenCTDM}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="code"
                  className="form-control"
                  placeholder="Code sản phẩm"
                  value={formData.code}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="mauSP"
                  className="form-control"
                  placeholder="Màu sắc"
                  value={formData.mauSP}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="anhSP"
                  className="form-control"
                  placeholder="Ảnh sản phẩm"
                  value={formData.anhSP}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="moTa"
                  className="form-control"
                  placeholder="Mô tả"
                  value={formData.moTa}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  id="soLuong"
                  className="form-control"
                  placeholder="Số lượng"
                  value={formData.soLuong}
                  readOnly
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  id="giaTien"
                  className="form-control"
                  placeholder="Giá thành"
                  value={formData.giaTien}
                  onChange={handleInputChange}
                />
              </div>

              <button
                className="btn-save"
                onClick={selectedProduct ? handleUpdate : handleSubmit}
                //onClick={handleSubmit}
              >
                <i className="bi bi-save"></i>{" "}
                {selectedProduct ? "Cập nhật" : "Thêm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SanPhamAdmin;
