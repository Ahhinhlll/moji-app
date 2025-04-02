-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: web
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ct_danhmuc`
--

DROP TABLE IF EXISTS `ct_danhmuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ct_danhmuc` (
  `ma_CTDM` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `maDM` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tenCTDM` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ma_CTDM`),
  KEY `maDM` (`maDM`),
  CONSTRAINT `ct_danhmuc_ibfk_1` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_10` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_11` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_12` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_2` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_3` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_4` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_5` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_6` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_7` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_8` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_danhmuc_ibfk_9` FOREIGN KEY (`maDM`) REFERENCES `danhmuc` (`maDM`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_danhmuc`
--

LOCK TABLES `ct_danhmuc` WRITE;
/*!40000 ALTER TABLE `ct_danhmuc` DISABLE KEYS */;
INSERT INTO `ct_danhmuc` VALUES ('382f808e-9120-48cb-a92f-76fdd348f042','efe4ffc1-111b-4c4f-a361-86a55b3286f8','Hoa','2025-03-27 02:37:54','2025-03-27 02:37:54'),('881bf6bc-95cf-4188-80fc-7ca3bfe4cfbb','efe4ffc1-111b-4c4f-a361-86a55b3286f8','Phụ kiện gói quà','2025-03-27 02:37:54','2025-03-27 02:37:54'),('9c7c5c2d-9236-45d5-a8fb-65423b890eb9','efe4ffc1-111b-4c4f-a361-86a55b3286f8',' Set quà yêu thương','2025-03-27 02:37:54','2025-03-27 02:37:54'),('a1f84787-ed7d-4ae4-86d7-f48c696fe0d4','23dff523-c765-4be0-ad08-c22e243c95ba','def','2025-03-25 09:22:44','2025-03-25 09:22:44'),('a3c014d1-df34-415f-8db8-204b64648720','23dff523-c765-4be0-ad08-c22e243c95ba','ghk','2025-03-25 09:22:44','2025-03-25 09:22:44');
/*!40000 ALTER TABLE `ct_danhmuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ct_hoadonban`
--

DROP TABLE IF EXISTS `ct_hoadonban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ct_hoadonban` (
  `ma_CTHDB` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `maHDB` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `maSP` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `soLuong` int(11) NOT NULL,
  `donGia` double NOT NULL,
  `thanhTien` double NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `maSanPham` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ma_CTHDB`),
  KEY `maHDB` (`maHDB`),
  KEY `maSP` (`maSP`),
  KEY `maSanPham` (`maSanPham`),
  CONSTRAINT `ct_hoadonban_ibfk_1` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_10` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_11` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_12` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_13` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_14` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_15` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_16` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_17` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_18` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_19` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_2` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_20` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_21` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_22` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_23` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_24` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_25` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_26` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_27` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_28` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_29` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_3` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_30` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_31` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_32` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_33` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_34` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_35` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_36` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_4` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_5` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_6` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_7` FOREIGN KEY (`maHDB`) REFERENCES `hoadonban` (`maHDB`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonban_ibfk_8` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`),
  CONSTRAINT `ct_hoadonban_ibfk_9` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_hoadonban`
--

LOCK TABLES `ct_hoadonban` WRITE;
/*!40000 ALTER TABLE `ct_hoadonban` DISABLE KEYS */;
/*!40000 ALTER TABLE `ct_hoadonban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ct_hoadonnhap`
--

DROP TABLE IF EXISTS `ct_hoadonnhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ct_hoadonnhap` (
  `ma_CTHDN` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `maHDN` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `maSP` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `soLuong` int(11) NOT NULL,
  `donGia` double NOT NULL,
  `thanhTien` double NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ma_CTHDN`),
  KEY `maHDN` (`maHDN`),
  KEY `maSP` (`maSP`),
  CONSTRAINT `ct_hoadonnhap_ibfk_1` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_10` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_11` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_12` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_13` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_14` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_15` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_16` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_17` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_18` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_19` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_2` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_20` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_21` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_22` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_23` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_24` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_3` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_4` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_5` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_6` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_7` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_8` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`maSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_hoadonnhap_ibfk_9` FOREIGN KEY (`maHDN`) REFERENCES `hoadonnhap` (`maHDN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_hoadonnhap`
--

LOCK TABLES `ct_hoadonnhap` WRITE;
/*!40000 ALTER TABLE `ct_hoadonnhap` DISABLE KEYS */;
/*!40000 ALTER TABLE `ct_hoadonnhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhmuc`
--

DROP TABLE IF EXISTS `danhmuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhmuc` (
  `maDM` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tenDM` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`maDM`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhmuc`
--

LOCK TABLES `danhmuc` WRITE;
/*!40000 ALTER TABLE `danhmuc` DISABLE KEYS */;
INSERT INTO `danhmuc` VALUES ('23dff523-c765-4be0-ad08-c22e243c95ba','abc','2025-03-25 09:22:44','2025-03-25 09:22:44'),('efe4ffc1-111b-4c4f-a361-86a55b3286f8','Quà tặng','2025-03-27 02:37:54','2025-03-27 02:37:54');
/*!40000 ALTER TABLE `danhmuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadonban`
--

DROP TABLE IF EXISTS `hoadonban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoadonban` (
  `maHDB` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ngayBan` datetime NOT NULL,
  `trangThai` varchar(255) NOT NULL,
  `ngayDuyet` datetime DEFAULT NULL,
  `tongTien` double NOT NULL,
  `phuongThuc` varchar(255) NOT NULL,
  `maND` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`maHDB`),
  KEY `maND` (`maND`),
  CONSTRAINT `hoadonban_ibfk_1` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_10` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_11` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_12` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_2` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_3` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_4` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_5` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_6` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_7` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_8` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonban_ibfk_9` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadonban`
--

LOCK TABLES `hoadonban` WRITE;
/*!40000 ALTER TABLE `hoadonban` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoadonban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadonnhap`
--

DROP TABLE IF EXISTS `hoadonnhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoadonnhap` (
  `maHDN` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ngayNhap` datetime NOT NULL,
  `giamGia` double DEFAULT NULL,
  `tongTien` double NOT NULL,
  `phuongThuc` varchar(255) NOT NULL,
  `maND` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `maNCC` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`maHDN`),
  KEY `maND` (`maND`),
  KEY `maNCC` (`maNCC`),
  CONSTRAINT `hoadonnhap_ibfk_1` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_10` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_11` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_12` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_13` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_14` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_15` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_16` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_17` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_18` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_19` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_2` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_20` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_21` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_22` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_23` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_24` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_3` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_4` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_5` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_6` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_7` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_8` FOREIGN KEY (`maNCC`) REFERENCES `nhacungcap` (`maNCC`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hoadonnhap_ibfk_9` FOREIGN KEY (`maND`) REFERENCES `nguoidung` (`maND`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadonnhap`
--

LOCK TABLES `hoadonnhap` WRITE;
/*!40000 ALTER TABLE `hoadonnhap` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoadonnhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidung` (
  `maND` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tenND` varchar(255) NOT NULL,
  `diaChi` varchar(255) NOT NULL,
  `ngaySinh` date NOT NULL,
  `sdt` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `taiKhoan` varchar(255) NOT NULL,
  `matKhau` varchar(255) NOT NULL,
  `anhThe` text DEFAULT NULL,
  `maVT` varchar(255) NOT NULL DEFAULT 'U11',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`maND`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `taiKhoan` (`taiKhoan`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `taiKhoan_2` (`taiKhoan`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `taiKhoan_3` (`taiKhoan`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `taiKhoan_4` (`taiKhoan`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `taiKhoan_5` (`taiKhoan`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `taiKhoan_6` (`taiKhoan`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `taiKhoan_7` (`taiKhoan`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `taiKhoan_8` (`taiKhoan`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `taiKhoan_9` (`taiKhoan`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `taiKhoan_10` (`taiKhoan`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `taiKhoan_11` (`taiKhoan`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `taiKhoan_12` (`taiKhoan`),
  KEY `maVT` (`maVT`),
  CONSTRAINT `nguoidung_ibfk_1` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_10` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_11` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_12` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_2` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_3` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_4` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_5` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_6` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_7` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_8` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nguoidung_ibfk_9` FOREIGN KEY (`maVT`) REFERENCES `vaitro` (`maVT`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES ('1ee21350-dc01-46d9-acc6-ba98cf1333fc','Mai An ','Làng Tranh, Phù Cừ, Hưng Yên','2004-08-08','0987654321','maian@gmail.com','maian','e10adc3949ba59abbe56e057f20f883e','[\"/uploads/1742014767849.JPG\"]','A00','2025-03-26 01:27:24','2025-03-26 01:47:54'),('7e42806c-81a5-4824-9684-bf5bd4b989cb','Thanh Bình','Nội Linh,','2004-01-12','0387238815','thanhbinh6a7@gmail.com','binhbanhbeo','e10adc3949ba59abbe56e057f20f883e','[null]','U11','2025-03-26 01:30:26','2025-03-26 01:30:26'),('ef88f0d3-6d49-4dd7-baf2-51c58788d2ba','Nguyen Van A','Nội Linh, Huyện Tiên Lữ, Tỉnh Hưng Yên','2004-01-26','0387238815','anhp03994@gmail.com','nguyenvana','e10adc3949ba59abbe56e057f20f883e','[null]','U11','2025-03-26 01:41:48','2025-03-26 01:41:48');
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhacungcap`
--

DROP TABLE IF EXISTS `nhacungcap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhacungcap` (
  `maNCC` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tenNCC` varchar(255) NOT NULL,
  `diaChi` varchar(255) NOT NULL,
  `sdt` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`maNCC`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhacungcap`
--

LOCK TABLES `nhacungcap` WRITE;
/*!40000 ALTER TABLE `nhacungcap` DISABLE KEYS */;
INSERT INTO `nhacungcap` VALUES ('eba422ac-46dc-48c0-a9c8-b34e0cb6b003','Mai An','Phù Cừ','0987654321','thanhbinh6a7@gmail.com','2025-03-26 02:44:11','2025-03-26 02:44:11');
/*!40000 ALTER TABLE `nhacungcap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `maSP` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ma_CTDM` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tenSP` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `mauSP` varchar(255) DEFAULT NULL,
  `anhSP` text DEFAULT NULL,
  `moTa` text DEFAULT NULL,
  `soLuong` int(11) NOT NULL DEFAULT 0,
  `giaTien` double NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`maSP`),
  KEY `ma_CTDM` (`ma_CTDM`),
  CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_10` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_11` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_12` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_2` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_3` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_4` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_5` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_6` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_7` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_8` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sanpham_ibfk_9` FOREIGN KEY (`ma_CTDM`) REFERENCES `ct_danhmuc` (`ma_CTDM`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES ('b8a4d91d-0bd4-48b0-bb6b-5cc8124af6d1','a3c014d1-df34-415f-8db8-204b64648720','sản phẩm 3','APTX4689','hồng phai','[\"/uploads/1741242725470.jpeg\",\"/uploads/1741245245673.jpeg\"]','sản phẩm rất đẹp nha bà con ahhhhhhhhhh',0,120000,'2025-03-26 03:08:17','2025-03-26 03:08:17'),('e4ee46a7-e4c2-4483-ae07-e8a03c47d4d2','a1f84787-ed7d-4ae4-86d7-f48c696fe0d4','sản phẩm 1','APTX4689','hồng phai','[\"/uploads/1741528939517.jpeg\",\"/uploads/1741528939522.png\"]','sản phẩm rất đẹp nha bà con ahhhhhhhhhh',0,120000,'2025-03-25 09:23:08','2025-03-25 09:23:08'),('f7e8660d-7677-42a2-af07-dfadfe616b2b','a1f84787-ed7d-4ae4-86d7-f48c696fe0d4','sản phẩm 2','APTX4689','hồng phai','[\"/uploads/1741242725470.jpeg\",\"/uploads/1741245245673.jpeg\"]','sản phẩm rất đẹp nha bà con ahhhhhhhhhh',0,120000,'2025-03-26 02:47:31','2025-03-26 02:47:31');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaitro`
--

DROP TABLE IF EXISTS `vaitro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaitro` (
  `maVT` varchar(255) NOT NULL,
  `tenVT` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`maVT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaitro`
--

LOCK TABLES `vaitro` WRITE;
/*!40000 ALTER TABLE `vaitro` DISABLE KEYS */;
INSERT INTO `vaitro` VALUES ('A00','admin','2025-03-26 08:27:10','2025-03-26 08:27:10'),('U11','user','2025-03-26 08:27:10','2025-03-26 08:27:10');
/*!40000 ALTER TABLE `vaitro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-28  9:08:18
