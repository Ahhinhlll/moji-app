import { useEffect, useState } from "react";
import { getPhanLoaiTrangThai } from "../../../services/thongKeService";
import { Modal } from "react-bootstrap";

function ThongKeBang() {
  const [orderPage, setOrderPage] = useState(1);
  const [orderPageSize] = useState(5);
  const [filterOrderStatus, setFilterOrderStatus] = useState("Tất cả");
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getPhanLoaiTrangThai();

        let all = [];
        if (res.daDuyet)
          all = all.concat(
            res.daDuyet.map((o) => ({
              ...o,
              status: "Đã duyệt",
              statusColor: "bg-success",
            }))
          );
        if (res.choDuyet)
          all = all.concat(
            res.choDuyet.map((o) => ({
              ...o,
              status: "Chờ duyệt",
              statusColor: "bg-warning text-dark",
            }))
          );
        if (res.daHuy)
          all = all.concat(
            res.daHuy.map((o) => ({
              ...o,
              status: "Đã hủy",
              statusColor: "bg-danger",
            }))
          );
        setOrders(all);
      } catch (error) {
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  // Filter and paginate orders
  let filteredOrders = [];
  if (filterOrderStatus === "Tất cả") {
    // Sắp xếp theo ngày bán mới nhất nếu là tất cả
    filteredOrders = [...orders].sort(
      (a, b) => new Date(b.ngayBan) - new Date(a.ngayBan)
    );
  } else {
    filteredOrders = orders.filter((o) => o.status === filterOrderStatus);
  }
  const totalOrderPages = Math.ceil(filteredOrders.length / orderPageSize) || 1;
  const pagedOrders = filteredOrders.slice(
    (orderPage - 1) * orderPageSize,
    orderPage * orderPageSize
  );

  // Reset page if filter changes
  useEffect(() => {
    setOrderPage(1);
  }, [filterOrderStatus]);
  const getProductImage = (imageArray) => {
    if (Array.isArray(imageArray) && imageArray.length > 0) {
      return `http://localhost:3001${imageArray[0]}`;
    }
    return "/image/default.jpg";
  };

  return (
    <div className="row g-3">
      {/* đơn hàng */}
      <div className="card shadow-sm mb-5 p-0">
        <div
          className="card-header text-dark d-flex justify-content-between align-items-center px-3 py-2 rounded-top shadow-sm"
          style={{ backgroundColor: "#ED6E94" }}
        >
          <h5 className="mb-0 fw-semibold text-white">Đơn hàng mới nhất</h5>
          <select
            className="form-select form-select-sm w-auto custom-select-order"
            value={filterOrderStatus}
            onChange={(e) => setFilterOrderStatus(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
            <option value="Đã duyệt">Đã duyệt</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark text-center">
              <tr>
                <th className="text-dark">STT</th>
                <th className="text-dark">Khách hàng</th>
                <th className="text-dark">Ngày bán</th>
                <th className="text-dark">Phương thức</th>
                <th className="text-dark">Tổng tiền (VNĐ)</th>
                <th className="text-dark">Trạng thái</th>
                <th className="text-dark">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {pagedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                pagedOrders.map((o, idx) => (
                  <tr key={o.khachHang + o.ngayBan + o.trangThai + idx}>
                    <td>{(orderPage - 1) * orderPageSize + idx + 1}</td>
                    <td>{o.khachHang}</td>
                    <td>{new Date(o.ngayBan).toLocaleDateString("vi-VN")}</td>
                    <td>{o.phuongThuc}</td>
                    <td>{o.tongTien.toLocaleString()} đ</td>
                    <td>
                      <span className={`badge ${o.statusColor}`}>
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-info btn-sm rounded-circle"
                        onClick={() => {
                          setSelectedOrder(o);
                          setShowModal(true);
                        }}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Phân trang đơn hàng */}
        <nav className="mt-2">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${orderPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setOrderPage(orderPage - 1)}
              >
                &laquo;
              </button>
            </li>
            {[...Array(totalOrderPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${orderPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setOrderPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                orderPage === totalOrderPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setOrderPage(orderPage + 1)}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Modal chi tiết hóa đơn */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết hóa đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder &&
          selectedOrder.chiTiet &&
          selectedOrder.chiTiet.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light text-center">
                  <tr>
                    <th>STT</th>
                    <th className="text-start">Tên sản phẩm</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {selectedOrder.chiTiet.map((ct, idx) => (
                    <tr key={ct.tenSP + idx}>
                      <td>{idx + 1}</td>
                      <td className="text-start">{ct.tenSP}</td>
                      <td>
                        {ct.anhSP ? (
                          <img
                            src={getProductImage(ct.anhSP)}
                            alt={ct.tenSP}
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />
                        ) : (
                          <span className="text-muted">Không có ảnh</span>
                        )}
                      </td>
                      <td>{ct.soLuong}</td>
                      <td>{ct.donGia?.toLocaleString()} đ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-muted">
              Không có chi tiết hóa đơn
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default ThongKeBang;
