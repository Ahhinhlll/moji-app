import { useState, useEffect } from "react";
import { getUserById } from "../services/userService";
import { getRoleById } from "../services/roleService";
import jwtDecode from "jwt-decode";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [tenVT, setTenVT] = useState(""); // State để lưu tên vai trò
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const maND = decoded.maND;
        if (!maND) throw new Error("Không tìm thấy maND trong token!");

        const user = await getUserById(maND);
        setUserData(user);

        if (user.maVT) {
          const roleName = await getRoleById(user.maVT); // Gọi API lấy tên vai trò
          setTenVT(roleName);
        }
      } catch (error) {
        console.error(
          "Lỗi khi lấy thông tin người dùng:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserData();
  }, [token]);

  if (!userData) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div>
      <h2>Thông tin người dùng</h2>
      <p>
        <b>Họ tên:</b> {userData.tenND}
      </p>
      <p>
        <b>Email:</b> {userData.email}
      </p>
      <p>
        <b>Số điện thoại:</b> {userData.sdt}
      </p>
      <p>
        <b>Địa chỉ:</b> {userData.diaChi}
      </p>
      <p>
        <b>mật khẩu:</b>
        {"*".repeat(userData.matKhau.length)}
      </p>
      <p>
        <b>Vai trò:</b> {tenVT || "Đang tải..."}
      </p>{" "}
      {/* Hiển thị tên vai trò */}
    </div>
  );
};
