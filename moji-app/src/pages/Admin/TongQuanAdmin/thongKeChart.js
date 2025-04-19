import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function thongKeChart() {
  // Màu sắc cho biểu đồ tròn
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  // Dữ liệu cho biểu đồ cột
  const dataBar = [
    { name: "01/04", DoanhThu: 50 },
    { name: "02/04", DoanhThu: 80 },
    { name: "03/04", DoanhThu: 40 },
    { name: "04/04", DoanhThu: 95 },
    { name: "05/04", DoanhThu: 60 },
    { name: "06/04", DoanhThu: 75 },
    { name: "07/04", DoanhThu: 55 },
  ];

  // Dữ liệu cho biểu đồ tròn
  const dataPie = [
    { name: "Danh mục A", value: 50 },
    { name: "Danh mục B", value: 30 },
    { name: "Danh mục C", value: 70 },
    { name: "Danh mục D", value: 40 },
  ];

  return (
    <div className="row my-4">
      <div className="container mt-4">
        <div className="row">
          {/* Biểu đồ cột */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  Tổng doanh thu bán hàng trong 7 ngày
                </h5>
                <BarChart width={470} height={300} data={dataBar}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="DoanhThu" fill="#8884d8" />
                </BarChart>
              </div>
            </div>
          </div>

          {/* Biểu đồ tròn */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  Top 5 danh mục có sản phẩm bán chạy
                </h5>
                <PieChart width={500} height={300}>
                  <Pie
                    data={dataPie}
                    cx="40%"
                    cy="50%"
                    innerRadius={50} // rỗng giữa
                    outerRadius={100}
                    //label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    dataKey="value"
                  >
                    {dataPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ right: 60 }}
                  />
                </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default thongKeChart;
