function yeuThich() {
  return (
    <div className="content">
      <h5 className="fw-bold">Sản Phẩm Yêu Thích</h5>
      <p className="description mb-3">
        Hãy <i className="bi bi-heart-fill" style={{ color: "#FFB0BD" }} /> sản
        phẩm bạn yêu thích để xem thuận tiện hơn
      </p>
      <hr />
      <div
        style={{
          textAlign: "center",
          fontSize: "14px",
          backgroundColor: "#FFF3CD",
          padding: "5px",
          borderRadius: "5px",
          color: "#896604",
        }}
      >
        Danh sách sản phẩm yêu thích của bạn hiện tại không có sản phẩm nào !
      </div>
    </div>
  );
}

export default yeuThich;
