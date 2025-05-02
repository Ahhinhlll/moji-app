function donHang() {
  return (
    <div className="content">
      <h5 className="fw-bold">Lịch sử đơn hàng</h5>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <td style={{ fontWeight: "500" }}>Ngày đặt</td>
            <td style={{ fontWeight: "500" }}>Tổng đơn</td>
            <td style={{ fontWeight: "500" }}>Trạng thái</td>
            <td style={{ fontWeight: "500" }}>Mã đơn hàng</td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default donHang;
