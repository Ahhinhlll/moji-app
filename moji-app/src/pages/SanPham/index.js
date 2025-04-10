import React, { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import ProductList from "../../components/Product/ProductList";
import CategoryList from "../../components/Category/CategoryList";
import {
  getAllCtCategory,
  searchSPtoCTDM,
} from "../../services/danhMucService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sanPham.scss";

function SanPham() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ma_CTDM = searchParams.get("ma_CTDM");
  const tuKhoa = searchParams.get("q");

  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "Danh sách sản phẩm",
  });

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (tuKhoa) {
        try {
          const res = await searchSPtoCTDM(tuKhoa);
          if (res.type === "ChiTietDanhMuc") {
            const first = res.result[0];
            setSelectedCategory({
              id: first.ma_CTDM,
              name: `Tìm kiếm: "${tuKhoa}"`,
            });
            setSearchResults(first.SanPhams);
          } else if (res.type === "SanPham") {
            setSelectedCategory({ id: null, name: `Tìm kiếm: "${tuKhoa}"` });
            setSearchResults(res.result);
          }
        } catch (error) {
          console.error("Lỗi tìm kiếm:", error);
        }
      } else if (ma_CTDM) {
        try {
          const categories = await getAllCtCategory();
          const selected = categories.find((cat) => cat.ma_CTDM === ma_CTDM);
          if (selected) {
            setSelectedCategory({ id: ma_CTDM, name: selected.tenCTDM });
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh mục:", error);
        }
      } else {
        setSelectedCategory({ id: null, name: "Danh sách sản phẩm" });
      }
    };

    fetchSearchData();
  }, [ma_CTDM, tuKhoa]);

  const handleSelectedCategory = (categoryId, categoryName) => {
    setSelectedCategory({ id: categoryId, name: categoryName });

    if (categoryId) {
      navigate(`/san-pham?ma_CTDM=${categoryId}`);
    } else {
      navigate("/san-pham");
    }
  };

  return (
    <div className="container my-4">
      {id ? (
        <Outlet />
      ) : (
        <div className="row">
          {/* DANH MỤC */}
          <div className="col-md-3">
            <CategoryList onSelectCategory={handleSelectedCategory} />
          </div>

          {/* DANH SÁCH SẢN PHẨM */}
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="product-title fw-bold">{selectedCategory.name}</h5>
              <select className="form-select w-auto" defaultValue={0}>
                <option value={0}>Mới nhất</option>
                <option value={1}>Giá tăng dần</option>
                <option value={2}>Giá giảm dần</option>
              </select>
            </div>

            <ProductList
              rows={6}
              selectedCategory={selectedCategory.id}
              searchKeyword={tuKhoa}
              searchResults={searchResults}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SanPham;
