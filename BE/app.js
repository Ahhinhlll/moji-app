const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const setupSwagger = require("./config/swagger");
const danhMucRoutes = require("./routes/danhMucRoutes");
const sanPhamRoutes = require("./routes/sanPhamRoutes");
const vaiTroRoutes = require("./routes/vaiTroRoutes");
const nguoiDungRoutes = require("./routes/nguoiDungRoutes");
const nhaCungCapRoutes = require("./routes/nhaCungCapRoutes");
const authRoutes = require("./routes/authRoutes");
const upLoadRoutes = require("./routes/upLoadRoutes");
const hoaDonNhapRoutes = require("./routes/hoaDonNhapRoutes");
const hoaDonBanRoutes = require("./routes/hoaDonBanRoutes");
//const payOSRoutes = require("./routes/payosRoutes");
const { PORT } = require("./config/config");

const app = express();
require("dotenv").config();
const geminiRoutes = require("./routes/geminiRoutes");
const vnpayRoute = require("./routes/vnpayRoutes");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api", geminiRoutes);
app.use("/api", vnpayRoute);

app.use("/uploads", express.static("public/uploads"));

app.use("/api", danhMucRoutes);
app.use("/api", sanPhamRoutes);
app.use("/api", vaiTroRoutes);
app.use("/api", nguoiDungRoutes);
app.use("/api", nhaCungCapRoutes);
app.use("/api", authRoutes);
app.use("/api", upLoadRoutes);
app.use("/api", hoaDonNhapRoutes);
app.use("/api", hoaDonBanRoutes);
//app.use("/api", payOSRoutes);

// Thiết lập Swagger
setupSwagger(app);

sequelize
  .sync() // { force: true } { alter: true }
  .then(() => {
    console.log("Kết nối database thành công");
    app.listen(PORT, () => {
      console.log(`Máy chủ đang chạy tại: http://localhost:${PORT}/api-docs/`);
    });
  })
  .catch((error) => {
    console.error("Lỗi kết nối database", error);
  });

module.exports = app;
