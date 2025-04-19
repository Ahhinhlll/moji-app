function thongKeBang() {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-6">
        <div className="card">
          <div className="card-header">Đơn đặt hàng gần đây</div>
          <div className="table-responsive">
            <table className="table mb-0 align-middle">
              <thead>
                <tr>
                  <th>Ngày đặt</th>
                  <th>Khách hàng</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Số lượng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12/04/2025</td>
                  <td>Mai An</td>
                  <td>
                    <span className="badge bg-success">Hoàn thành</span>
                  </td>
                  <td className="text-center">120</td>
                </tr>
                <tr>
                  <td>13/04/2025</td>
                  <td>Quỳnh Lan</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      Chờ duyệt
                    </span>
                  </td>
                  <td className="text-center">10</td>
                </tr>
                <tr>
                  <td>14/04/2025</td>
                  <td>Mai Lan</td>
                  <td>
                    <span className="badge bg-danger">Đã hủy</span>
                  </td>
                  <td className="text-center">130</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="card">
          <div className="card-header">Sản phẩm bán chạy</div>
          <div className="table-responsive">
            <table className="table mb-0 align-middle">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Danh mục</th>
                  <th className="text-center">Đã bán</th>
                  <th className="text-center">Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Laptop Pro 15"</td>
                  <td>Laptops</td>
                  <td className="text-center">25</td>
                  <td className="text-center">1,200</td>
                </tr>
                <tr>
                  <td>Desktop Elite</td>
                  <td>Desktops</td>
                  <td className="text-center">10</td>
                  <td className="text-center">850</td>
                </tr>
                <tr>
                  <td>Wireless Mouse</td>
                  <td>Peripherals</td>
                  <td className="text-center">5</td>
                  <td className="text-center">1,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default thongKeBang;
