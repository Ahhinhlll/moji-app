import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./thanhToan.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/nguoiDungService";
import { createBill } from "../../services/hoaDonBanService";
function ThanhToan() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const [nguoiDung, setNguoiDung] = useState({});
  const [phuongThuc, setPhuongThuc] = useState("Thanh toán khi nhận hàng");
  const [voucher, setVoucher] = useState("");
  const [giamTien, setGiamTien] = useState(0);
  const [dieuKhoan, setDieuKhoan] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const username = localStorage.getItem("taiKhoan");
      const allUser = await getAllUsers();
      const user = allUser.find((user) => user.taiKhoan === username);
      if (user) {
        setNguoiDung(user);
      }
    };

    fetchUser();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.giaTien * item.quantity,
    0
  );
  const handleDiscount = () => {
    switch (voucher) {
      case "moji10k":
        setGiamTien(10000);
        break;
      case "moji20k":
        setGiamTien(20000);
        break;
      case "moji50k":
        setGiamTien(50000);
        break;
      default:
        setGiamTien(0);
        alert("Mã giảm giá không hợp lệ");
    }
  };

  const detailProduct = cartItems.length === 1;

  const handlePayment = async () => {
    if (!dieuKhoan) {
      alert("Vui lòng đồng ý với các điều khoản trước khi thanh toán.");
      return;
    }
    try {
      const data = await createBill({
        giamGia: giamTien,
        phuongThuc: phuongThuc,
        maND: nguoiDung.maND,
        CTHoaDonBans: detailProduct
          ? [{ maSP: cartItems[0].maSP, soLuong: cartItems[0].quantity }]
          : cartItems.map((item) => ({
              maSP: item.maSP,
              soLuong: item.quantity,
            })),
      });
      if (data) {
        alert("Đặt hàng thành công");
        localStorage.removeItem("gioHang");
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      alert("Thanh toán thất bại. Vui lòng đăng nhập trước khi thanh toán.");
      navigate("/dang-nhap");
    }
  };

  return (
    <div className="checkout-page container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h5 className="section-title">
            <span className="step-number">1</span> Thông tin người nhận
          </h5>
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Họ tên *"
              defaultValue={nguoiDung.tenND}
              readOnly
            />
            <input
              type="text"
              className="form-control"
              placeholder="Điện thoại *"
              defaultValue={nguoiDung.sdt}
              readOnly
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email *"
              defaultValue={nguoiDung.email}
              readOnly
            />

            <input
              type="text"
              className="form-control"
              placeholder="Địa chỉ chi tiết *"
              defaultValue={nguoiDung.diaChi}
              readOnly
            />

            <textarea
              className="form-control"
              rows={3}
              placeholder="Ghi chú"
              defaultValue={""}
            />
          </form>
          <p className="note">
            Đơn hàng trên website được xử lý trong giờ hành chính. Vui lòng liên
            hệ fanpage ngoài khung giờ trên để được hỗ trợ.
            <br />
            Đơn hàng Moji không đồng kiểm khi giao hàng. Khách hàng vui lòng
            quay video khi bóc hàng để được hỗ trợ tốt nhất nếu xảy ra vấn đề.
          </p>
        </div>
        <div className="col-md-4">
          <h5 className="section-title">
            <span className="step-number">2</span> Phương thức thanh toán
          </h5>
          <div className="bordered-box">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="bankTransfer"
                checked={phuongThuc === "Chuyển khoản trực tiếp"}
                onChange={() => setPhuongThuc("Chuyển khoản trực tiếp")}
              />
              <label className="form-check-label" htmlFor="bankTransfer">
                Chuyển khoản trước toàn bộ tiền hàng
              </label>
            </div>
            <div className="highlight-box">
              <p>
                Với phương thức Chuyển khoản trước toàn bộ tiền hàng, bộ phận
                CSKH sẽ gọi điện đến bạn để xác nhận đơn hàng và hướng dẫn cách
                thức thanh toán chuyển khoản.
              </p>
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="cod"
                checked={phuongThuc === "Thanh toán khi nhận hàng"}
                onChange={() => setPhuongThuc("Thanh toán khi nhận hàng")}
              />
              <label className="form-check-label" htmlFor="cod">
                Thanh toán khi nhận hàng
              </label>
            </div>
            <div className="highlight-box">
              <p>
                Thanh toán khi nhận hàng (COD) chỉ áp dụng cho các đơn hàng ở
                các quận/huyện dưới đây thuộc Hà Nội/TP.HCM:
              </p>
              <p>
                {""}+ Hà Nội: Quận Hoàn Kiếm, Ba Đình, Đống Đa, Hoàng Mai, Hai
                Bà Trưng, Cầu Giấy, Thanh Xuân, Tây Hồ, Từ Liêm, Hà Đông, Long
                Biên, Gia Lâm, Sơn Tây, Ba Vì, Mê Linh, Đông Anh, Thường Tín,
                Thanh Trì
              </p>
              <p>
                + HCM: Quận 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, Tân Bình, Tân
                Phú, Phú Nhuận, Bình Thạnh, Gò Vấp, Bình Tân, Thủ Đức, Bình
                Chánh, Nhà Bè, Hooc Môn
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h5 className="section-title">
            <span className="step-number">3</span> Thông tin giỏ hàng
          </h5>

          {/* Bảng sản phẩm */}
          <table className="table">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.maSP}>
                  <td>
                    {item.tenSP}-{item.mauSP}
                    <div className="product-price">
                      Đơn giá: <strong>{item.giaTien}đ</strong>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <strong>{item.giaTien * item.quantity}đ</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bảng tổng tiền */}
          <table className="table">
            <tbody>
              <tr>
                <td>Tạm tính</td>
                <td>{total.toLocaleString()}đ</td>
              </tr>
              <tr>
                <td>Phí vận chuyển</td>
                <td>0đ</td>
              </tr>
              <tr>
                <td>Mã giảm giá</td>
                <td>{giamTien.toLocaleString()}đ</td>
              </tr>
              <tr>
                <td>
                  <strong>Tổng cộng</strong>
                </td>
                <td>
                  <strong>{(total - giamTien).toLocaleString()}đ</strong>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Ô nhập mã giảm giá */}
          <div className="input-group mb-3 discount-box">
            <input
              type="text"
              className="form-control"
              placeholder="Mã giảm giá"
              value={voucher || ""}
              onChange={(e) => setVoucher(e.target.value)}
            />
            <button
              className="btn btn-pink apDung"
              onClick={handleDiscount}
              type="button"
            >
              Áp dụng
            </button>
          </div>

          {/* Điều khoản */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="terms"
              checked={dieuKhoan}
              onChange={() => setDieuKhoan(!dieuKhoan)}
            />
            <label className="form-check-label" htmlFor="terms">
              Tôi đồng ý với các điều khoản{" "}
              <Link
                to="#"
                className="text-decoration-none"
                style={{ color: "#ff69b4" }}
              >
                chính sách giao hàng
              </Link>
            </label>
          </div>

          {/* Nút Thanh toán */}
          <div className="text-end">
            <button
              className="btn btn-pink thanhToan"
              type="button"
              onClick={handlePayment}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ThanhToan;
