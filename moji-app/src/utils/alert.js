import Swal from "sweetalert2";

const showSuccessAlert = (message = "Thành công!") => {
  Swal.fire({
    title: "Thành công!",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  });
};

const showErrorAlert = (message = "Có lỗi xảy ra!") => {
  Swal.fire({
    title: "Lỗi!",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  });
};

const showWarningAlert = (message = "Cảnh báo!") => {
  Swal.fire({
    title: "Cảnh báo!",
    text: message,
    icon: "warning",
    confirmButtonText: "OK",
  });
};

export { showSuccessAlert, showErrorAlert, showWarningAlert };
