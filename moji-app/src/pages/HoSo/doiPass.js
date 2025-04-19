function doiPass() {
  return (
    <div className="content">
      <h5 className="fw-bold">THAY ĐỔI MẬT KHẨU</h5>
      <p className="description mb-3">
        Bạn nên cập nhập mật khẩu thường xuyên vì lý do bảo mật
      </p>
      <hr />
      <form>
        <div class="row mb-3 align-items-center">
          <label
            class="col-sm-3 col-form-label text-sm-end form-label"
            for="matKhauCu"
          >
            Mật khẩu cũ:
          </label>
          <div class="col-sm-7 col-12">
            <input
              class="form-control"
              id="matKhauCu"
              type="text"
              placeholder="Mật khẩu cũ"
            />
          </div>
        </div>
        <div class="row mb-3 align-items-center">
          <label
            class="col-sm-3 col-form-label text-sm-end form-label"
            for="matKhauMoi"
          >
            Mật khẩu mới:
          </label>
          <div class="col-sm-7 col-12">
            <input
              class="form-control"
              id="matKhauMoi"
              type="text"
              placeholder="Mật khẩu mới"
            />
          </div>
        </div>
        <div class="row mb-3 align-items-center">
          <label
            class="col-sm-3 col-form-label text-sm-end form-label"
            for="xacNhanMatKhau"
          >
            Xác nhận mật khẩu:
          </label>
          <div class="col-sm-7 col-12">
            <input
              class="form-control"
              id="xacNhanMatKhau"
              type="text"
              placeholder="Xác nhận mật khẩu"
            />
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-sm-7 col-12 d-flex justify-content-start ps-sm-0 ps-3">
            <button class="btn btn-update" disabled="" type="button">
              Xác nhận
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default doiPass;
