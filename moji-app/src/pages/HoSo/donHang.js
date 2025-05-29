import "./HoSo.scss";
import { Link } from "react-router-dom";

function DonHang() {
  return (
    <div className="container my-3 p-3 bg-white rounded-3 shadow-sm order-summary">
      <div className="d-flex align-items-center order-header mb-3 flex-wrap">
        <span className="badge badge-yt text-white">Yêu thích</span>
        <span className="shop-name">Moji-Món quà yêu thương</span>
        <div className="ms-auto d-flex align-items-center gap-2 flex-wrap">
          <Link to="#!" className="text-success-custom text-decoration-none">
            <i className="bi bi-truck me-2"></i>Giao hàng thành công
          </Link>
          <i className="bi bi-question-circle" style={{ fontSize: "14px" }}></i>
          <span className="text-danger-custom"> ĐÁNH GIÁ</span>
        </div>
      </div>

      <div className="d-flex gap-3 border-bottom pb-3">
        <img
          alt="Purple and white wave X decal sticker for motorcycle"
          className="product-img"
          height="80"
          src="https://storage.googleapis.com/a1aa/image/425553e8-b9be-41cd-8a06-d74b4a148f00.jpg"
          width="80"
        />
        <div>
          <div className="fw-normal fs-6">
            Tem wave X 50-100-110 đủ màu dán xe wave a -chất liệu không phai màu
            không ố vàng
          </div>
          <div className="text-muted-custom-sm">
            Phân loại hàng: wave x 110 mã 102, Loại 1
          </div>
          <div className="mt-1" style={{ fontSize: "0.9rem" }}>
            x1
          </div>
        </div>
        <div className="text-end">
          <div className="price-old">₫79.000</div>
          <div className="text-danger-custom">₫67.150</div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap d-flex-sm-row">
        <div className="text-muted-custom-sm">Đang chờ Người bán đánh giá</div>
        <div className="d-flex gap-2 align-items-center flex-wrap">
          <div className="me-3 text-end">
            <div>Thành tiền:</div>
            <div className="text-danger-custom-lg">₫67.150</div>
          </div>
          <button className="btn btn-buy-again text-white" type="button">
            Mua Lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonHang;
