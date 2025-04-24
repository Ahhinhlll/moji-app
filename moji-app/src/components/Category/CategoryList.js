import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCtCategory } from "../../services/danhMucService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../pages/SanPham/sanPham.scss";

function CategoryList({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("ma_CTDM");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getAllCtCategory();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục: ", error);
      }
    };
    fetchCategory();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/san-pham?ma_CTDM=${categoryId || ""}`);
    onSelectCategory(categoryId, categoryName);
  };

  return (
    <div className="bg-white my-2 rounded py-0 px-3">
      <h5 className="category-title">Danh mục sản phẩm</h5>
      <ul className="list-group" style={{ height: "350px", overflowY: "auto" }}>
        <li
          className={`list-group-item list-group-item-action ${
            !selectedCategory ? "active" : ""
          }`}
          onClick={() => handleCategoryClick(null, "Danh sách sản phẩm")}
          style={{ cursor: "pointer" }}
        >
          Tất cả sản phẩm
        </li>
        {categories.map((category) => (
          <li
            key={category.ma_CTDM}
            className={`list-group-item list-group-item-action ${
              selectedCategory === String(category.ma_CTDM) ? "active" : ""
            }`}
            onClick={() =>
              handleCategoryClick(category.ma_CTDM, category.tenCTDM)
            }
            style={{ cursor: "pointer" }}
          >
            {category.tenCTDM}
          </li>
        ))}
      </ul>

      <h5 className="price-title mt-4">GIÁ</h5>
      <p>Từ 0đ : 500,000đ</p>
      <input
        className="price-range w-100"
        max="500000"
        min="0"
        type="range"
        defaultValue="500000"
      />
    </div>
  );
}

export default CategoryList;
