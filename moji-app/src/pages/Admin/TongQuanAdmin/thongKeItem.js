function thongKeItem() {
  return (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-3">
        <div className="card p-3 h-100">
          <div className="d-flex align-items-center mb-2">
            <div className="icon-circle icon-bg-green me-3">
              <i className="bi bi-currency-yen" style={{ color: "#00b96b" }} />
            </div>
            <div>
              <div className="label-small">Doanh Thu</div>
            </div>
          </div>
          <p className="value-large mb-1">
            <i className="bi bi-currency-yen" />
            1,245,678
          </p>
          <p className="subtext text-green mb-0">
            +12.5% <span className="text-muted">so với kỳ trước</span>
          </p>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <div className="card p-3 h-100">
          <div className="d-flex align-items-center mb-2">
            <div className="icon-circle icon-bg-blue me-3">
              <i className="bi bi-cart-fill " style={{ color: "#2f54eb" }} />
            </div>
            <div>
              <div className="label-small">Đơn Đặt Hàng</div>
            </div>
          </div>
          <p className="value-large mb-1">1893</p>
          <p className="subtext text-green mb-0">
            +8.2% <span className="text-muted">so với kỳ trước</span>
          </p>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <div className="card p-3 h-100">
          <div className="d-flex align-items-center mb-2">
            <div className="icon-circle icon-bg-yellow me-3">
              <i className="bi bi-clock-fill" style={{ color: "#f0a93a" }} />
            </div>
            <div>
              <div className="label-small">Chờ Xử Lý</div>
            </div>
          </div>
          <p className="value-large mb-1">42</p>
          <p className="subtext text-red mb-0">
            +3.1% <span className="text-muted">so với kỳ trước</span>
          </p>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <div className="card p-3 h-100">
          <div className="d-flex align-items-center mb-2">
            <div className="icon-circle icon-bg-red me-3">
              <i
                className="bi bi-exclamation-triangle-fill"
                style={{ color: "#e55353" }}
              />
            </div>
            <div>
              <div className="label-small">Sản Phẩm Sắp Hết</div>
            </div>
          </div>
          <p className="value-large mb-1">15</p>
          <p className="subtext text-muted mb-0">
            0% <span className="text-muted">so với kỳ trước</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default thongKeItem;
