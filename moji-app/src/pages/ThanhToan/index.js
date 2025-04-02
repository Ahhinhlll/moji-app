import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./thanhToan.scss";
import { Link } from "react-router-dom";
function ThanhToan() {
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
            />
            <input
              type="text"
              className="form-control"
              placeholder="Điện thoại *"
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email *"
            />

            <input
              type="text"
              className="form-control"
              placeholder="Tỉnh/Thành phố *"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Quận/ Huyện *"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Địa chỉ chi tiết *"
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
                defaultChecked=""
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
              <tr>
                <td>
                  Đồ chơi xếp hình hoa Art exhibition tone xanh 7x11x15 - Mix
                  <div className="product-price">
                    Đơn giá: <strong>50.000đ</strong>
                  </div>
                </td>
                <td>3</td>
                <td>
                  <strong>150.000đ</strong>
                </td>
              </tr>
              <tr>
                <td>
                  Tất vớ lưới Cute animal fruit đường kẻ nền ô vuông - Mix
                  <div className="product-price">
                    Đơn giá: <strong>25.000đ</strong>
                  </div>
                </td>
                <td>1</td>
                <td>
                  <strong>25.000đ</strong>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Bảng tổng tiền */}
          <table className="table">
            <tbody>
              <tr>
                <td>Tạm tính</td>
                <td>175.000 đ</td>
              </tr>
              <tr>
                <td>Phí vận chuyển</td>
                <td>0 đ</td>
              </tr>
              <tr>
                <td>Mã giảm giá</td>
                <td>0 đ</td>
              </tr>
              <tr>
                <td>
                  <strong>Tổng cộng</strong>
                </td>
                <td>
                  <strong>175.000 đ</strong>
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
            />
            <button className="btn btn-pink apDung" type="button">
              Áp dụng
            </button>
          </div>

          {/* Điều khoản */}
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="terms" />
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
            <button className="btn btn-pink thanhToan" type="button">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ThanhToan;
