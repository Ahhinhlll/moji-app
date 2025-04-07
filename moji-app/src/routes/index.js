import LayoutDefault from "../Layout/LayoutDefault";
import DangKy from "../pages/DangKy";
import DangNhap from "../pages/DangNhap";
import TrangChu from "../pages/TrangChu";
import SanPham from "../pages/SanPham";
import Error404 from "../pages/Error404/Error404";
import GioHang from "../pages/GioHang";
import ProductDetail from "../components/Product/ProductDetail";
import LayoutAdmin from "../Layout/LayoutAdmin";
import TongQuanAdmin from "../pages/Admin/TongQuanAdmin";
import DanhMucAdmin from "../pages/Admin/DanhMucAdmin";
import SanPhamAdmin from "../pages/Admin/SanPhamAdmin";
import { Navigate } from "react-router-dom";
import ThanhToan from "../pages/ThanhToan";
import NhaCungCapAdmin from "./../pages/Admin/NhaCungCapAdmin/index";
import HoaDonBanAdmin from "../pages/Admin/HoaDonBanAdmin";
import HoSoAdmin from "./../pages/Admin/HoSoAdmin/index";
import HoaDonNhapAdmin from "../pages/Admin/HoaDonNhapAdmin";

export const routes = [
  // user
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <TrangChu />,
      },
      {
        path: "dang-nhap",
        element: <DangNhap />,
      },
      {
        path: "dang-ky",
        element: <DangKy />,
      },
      {
        path: "san-pham",
        element: <SanPham />,
        children: [
          {
            path: ":id",
            element: <ProductDetail />,
          },
        ],
      },
      {
        path: "gio-hang",
        element: <GioHang />,
      },
      {
        path: "thanh-toan",
        element: <ThanhToan />,
      },
    ],
  },
  // admin
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { path: "", element: <Navigate to="ho-so-admin" replace /> },
      {
        path: "tong-quan",
        element: <TongQuanAdmin />,
      },
      {
        path: "danh-muc-admin",
        element: <DanhMucAdmin />,
      },
      {
        path: "san-pham-admin",
        element: <SanPhamAdmin />,
      },
      {
        path: "ho-so-admin",
        element: <HoSoAdmin />,
      },
      {
        path: "nha-cung-cap-admin",
        element: <NhaCungCapAdmin />,
      },
      {
        path: "don-xuat-admin",
        element: <HoaDonBanAdmin />,
      },
      {
        path: "don-nhap-admin",
        element: <HoaDonNhapAdmin />,
      },
    ],
  },
  // error
  {
    path: "*",
    element: <Error404 />,
  },
];
