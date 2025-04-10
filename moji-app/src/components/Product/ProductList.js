import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../services/sanPhamService";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../pages/SanPham/sanPham.scss";
import { getCtCategoryById } from "../../services/danhMucService";

const ProductList = ({ rows, selectedCategory, searchResults }) => {
  // ✅ SỬA: thêm props searchResults
  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchResults && searchResults.length > 0) {
          setProductList(searchResults);
        } else if (selectedCategory) {
          const categoryData = await getCtCategoryById(selectedCategory);
          setProductList(categoryData?.SanPhams || []);
        } else {
          const allProducts = await getAllProducts();
          setProductList(allProducts);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchResults]);

  const displayedProducts = Array.isArray(productList)
    ? productList.slice(0, rows * 4)
    : [];

  const getProductImage = (imageArray) => {
    if (Array.isArray(imageArray) && imageArray.length > 0) {
      return `http://localhost:3001${imageArray[0]}`;
    }
    return "/image/default.jpg";
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const cartItem = { ...selectedProduct, quantity };
    console.log("Sản phẩm thêm vào giỏ:", cartItem);

    const existingCart = JSON.parse(localStorage.getItem("gioHang")) || [];
    console.log("Giỏ hàng trước khi thêm:", existingCart);

    const existingProductIndex = existingCart.findIndex(
      (item) => item.maSP === selectedProduct.maSP
    );

    let updatedCart;
    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += quantity;
      updatedCart = [...existingCart];
    } else {
      updatedCart = [...existingCart, cartItem];
    }
    console.log("Giỏ hàng sau khi thêm:", updatedCart);
    localStorage.setItem("gioHang", JSON.stringify(updatedCart));

    setAddedProduct(cartItem);
    setShowNotification(true);

    setTimeout(() => setShowNotification(false), 3000);

    handleCloseModal();
  };

  return (
    <div className="container">
      <div className="row">
        {displayedProducts.map((product) => (
          <div key={product.maSP} className="col-md-3 col-sm-6 col-12 mb-4">
            <div className="product-card">
              <Link
                to={`/san-pham/${product.maSP}`}
                className="text-decoration-none text-black"
              >
                <img
                  src={getProductImage(product.anhSP)}
                  alt={product.tenSP}
                  className="img-fluid product-img"
                />
                <h5 className="product-name mt-2">{product.tenSP}</h5>
                <p className="product-price">
                  {product.giaTien.toLocaleString("vi-VN")}đ
                </p>
              </Link>
              <div className="card-overlay">
                <span className="icon-wrapper">
                  <i className="bi bi-heart-fill"></i>
                </span>
                <span className="separator">|</span>
                <span
                  className="icon-wrapper"
                  onClick={() => handleShowModal(product)}
                >
                  <i className="bi bi-cart-fill"></i>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.tenSP}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={getProductImage(selectedProduct.anhSP)}
                    alt={selectedProduct.tenSP}
                    className="img-fluid mb-3"
                  />
                </div>
                <div className="col-md-6">
                  <p>Mã sản phẩm: {selectedProduct.code}</p>
                  <p>
                    Giá:{" "}
                    <span className="text-danger fw-bold">
                      {selectedProduct.giaTien.toLocaleString("vi-VN")}đ
                    </span>
                  </p>
                  <p>Màu sắc: {selectedProduct.mauSP || "Không có"}</p>
                  <div className="quantity-container mt-3">
                    <label className="me-2 mb-0">Số lượng:</label>
                    <button
                      className="btn quantity-btn"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      readOnly
                      style={{
                        width: "36px",
                        borderRadius: "5px",
                        textAlign: "center",
                        border: "none",
                        outline: "none",
                      }}
                    />
                    <button
                      className="btn quantity-btn"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Hủy
            </Button>
            <Button
              style={{
                backgroundColor: "rgba(247, 97, 144, 0.9)",
                borderColor: "rgba(248, 167, 180, 0.9)",
                color: "#fff",
              }}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* Thông báo khi thêm sản phẩm vào giỏ hàng */}
      {showNotification && addedProduct && (
        <div className="cart-notification">
          <img
            src={getProductImage(addedProduct.anhSP)}
            alt={addedProduct.tenSP}
            className="cart-notification-img"
          />
          <p>
            Chúc mừng! Bạn đã thêm thành công sản phẩm{" "}
            <strong>{addedProduct.tenSP}</strong> vào giỏ hàng!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
