import request from "../utils/request";

export const getAllCtBill = async () => {
  const response = await request.get("/cthoadonban/getall");
  return response.data;
};

export const getCtBillById = async (id) => {
  const response = await request.get(`/cthoadonban/getbyid/${id}`);
  return response.data;
};
export const getAllBill = async () => {
  const response = await request.get("/hoadonban/getall");
  return response.data;
};

export const getBillById = async (id) => {
  const response = await request.get(`/hoadonban/getbyid/${id}`);
  return response.data;
};

export const createBill = async (data) => {
  const response = await request.post("hoadonban/insert", data);
  return response.data;
};
export const deleteBill = async (id) => {
  const response = await request.delete(`hoadonban/delete/${id}`);
  return response.data;
};
