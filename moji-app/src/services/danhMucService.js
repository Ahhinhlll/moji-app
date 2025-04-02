import request from "../utils/request";

export const getAllCtCategory = async () => {
  const response = await request.get("/ctdanhmuc/getall");
  return response.data;
};

export const getCtCategoryById = async (id) => {
  const response = await request.get(`/ctdanhmuc/getbyid/${id}`);
  return response.data;
};
export const getAllCategory = async () => {
  const response = await request.get("/danhmuc/getall");
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await request.get(`/danhmuc/getbyid/${id}`);
  return response.data;
};
