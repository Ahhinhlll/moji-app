import React, { useEffect, useState } from "react";
import { getAllCtCategory } from "../../services/danhMucService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../pages/SanPham/sanPham.scss";

function CategoryList({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="bg-white my-2 rounded py-0 px-3">
      <h5 className="category-title">Danh mục sản phẩm</h5>
      <ul className="list-group">
        <li
          className="list-group-item list-group-item-action"
          onClick={() => onSelectCategory(null, "Tất cả sản phẩm")}
        >
          Tất cả sản phẩm
        </li>
        {categories.map((category) => (
          <li
            key={category.ma_CTDM}
            className="list-group-item list-group-item-action"
            onClick={() => onSelectCategory(category.ma_CTDM, category.tenCTDM)}
          >
            {category.tenCTDM}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
