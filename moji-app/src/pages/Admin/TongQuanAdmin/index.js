import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./tongQuan.scss";
import ThongKeItem from "./thongKeItem";
import ThongKeBang from "./thongKeBang";
import ThongKeChart from "./thongKeChart";

function TongQuanAdmin() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/dang-nhap");
  }
  return (
    <div className="tongQuanNe">
      <div className="container py-4">
        <ThongKeItem />
        <ThongKeChart />
        <ThongKeBang />
      </div>
    </div>
  );
}
export default TongQuanAdmin;
