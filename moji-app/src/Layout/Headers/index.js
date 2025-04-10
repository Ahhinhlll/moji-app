import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import { getAllCategory, searchSPtoCTDM } from "../../services/danhMucService";
import CartDropdown from "../../components/Cart/CartDropdown";

function Header() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCtDm = searchParams.get("ma_CTDM");
  const [cartCount, setCartCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  //const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("gioHang")) || [];
      const totalQuantity = storedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(totalQuantity);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    const interval = setInterval(updateCartCount, 100);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const taiKhoan = localStorage.getItem("taiKhoan");
    if (taiKhoan) {
      setUser(taiKhoan);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("taiKhoan");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategory();
        setCategories(allCategories);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/san-pham?ma_CTDM=${categoryId}`);
  };

  const handleSearchClick = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const res = await searchSPtoCTDM(searchQuery.trim());
        if (res.type === "ChiTietDanhMuc") {
          const firstCategory = res.result[0];
          navigate(
            `/san-pham?ma_CTDM=${firstCategory.ma_CTDM}&q=${encodeURIComponent(
              searchQuery.trim()
            )}`
          );
        } else if (res.type === "SanPham") {
          navigate(`/san-pham?q=${encodeURIComponent(searchQuery.trim())}`);
        }
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    }
  };

  return (
    <>
      {/* Phần 1: Thanh trên cùng */}
      <div className="top-bar d-flex justify-content-between px-4 py-2 fw-bold">
        <div className="left-section">MOJI - BÌNH BÁNH BÈO</div>
        <div className="right-section d-flex gap-3">
          <Link to="/stores">HỆ THỐNG CỬA HÀNG</Link>
          <Link to="/about">VỀ MOJI</Link>
          <Link to="/careers">TUYỂN DỤNG</Link>
        </div>
      </div>
      {/* Phần 2: Logo, Tìm kiếm, Giỏ hàng */}
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          {/* Logo */}
          <Navbar.Brand>
            <Link to="/">
              <img src="/image/logo.png" alt="Moji Logo" className="logo-img" />
            </Link>
          </Navbar.Brand>
          <div className="search-container text-center mt-3">
            {/* Thanh tìm kiếm */}
            <div className="input-group mx-auto" style={{ maxWidth: "500px" }}>
              <input
                type="search"
                className="form-control border-pink"
                placeholder="Tìm kiếm sản phẩm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-pink" onClick={handleSearchClick}>
                <i className="bi bi-search"></i>
              </button>
            </div>

            {/* Danh mục */}
            <div className="mt-2 hoverDanhMuc">
              <Link to="/hoa" className="mx-2 text-dark text-decoration-none">
                Hoa
              </Link>
              <Link
                to="/blindbox"
                className="mx-2 text-dark text-decoration-none"
              >
                Blindbox official
              </Link>
              <Link
                to="/gau-bong"
                className="mx-2 text-dark text-decoration-none"
              >
                Gấu bông
              </Link>
              <Link
                to="/tui-deo"
                className="mx-2 text-dark text-decoration-none"
              >
                Túi đeo
              </Link>
              <Link to="/vi" className="mx-2 text-dark text-decoration-none">
                Ví
              </Link>
              <Link
                to="/moc-khoa"
                className="mx-2 text-dark text-decoration-none"
              >
                Móc khóa
              </Link>
              <Link
                to="/guong-luoc"
                className="mx-2 text-dark text-decoration-none"
              >
                Gương lược
              </Link>
              <Link to="/idol" className="mx-2 text-dark text-decoration-none">
                Idol
              </Link>
            </div>
          </div>

          {/* Đăng nhập, Giỏ hàng */}
          <div className="user-actions">
            {user ? (
              <>
                <span className="fw-semibold">{user}</span> |{" "}
                <button
                  className="btn btn-link p-0 fw-semibold text-black"
                  onClick={handleLogout}
                >
                  Thoát
                </button>
              </>
            ) : (
              <>
                <Link to="/dang-nhap">Đăng nhập</Link> |{" "}
                <Link to="/dang-ky">Đăng ký</Link>
              </>
            )}
            <div className="cart-container">
              <div className="cart-icon">
                <i className="bi bi-bag-heart"></i>
                <span className="cart-badge">{cartCount}</span>
              </div>
              <CartDropdown />
            </div>
          </div>
        </Container>
      </Navbar>
      {/* Phần 3: Menu */}
      <Navbar expand="lg" className="menu-bar">
        <Container>
          <Nav className="mx-auto">
            {categories.map((category) =>
              category.CTDanhMucs.length > 0 ? (
                <NavDropdown
                  key={category.maDM}
                  title={category.tenDM}
                  id={`nav-${category.maDM}`}
                >
                  {category.CTDanhMucs.map((subCategory) => (
                    <NavDropdown.Item
                      key={subCategory.ma_CTDM}
                      onClick={() => handleCategoryClick(subCategory.ma_CTDM)}
                      className={
                        subCategory.ma_CTDM === selectedCtDm ? "active" : ""
                      }
                    >
                      {subCategory.tenCTDM}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link
                  key={category.maDM}
                  onClick={() => handleCategoryClick(category.maDM)}
                  className={category.maDM === selectedCtDm ? "active" : ""}
                >
                  {category.tenDM}
                </Nav.Link>
              )
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
