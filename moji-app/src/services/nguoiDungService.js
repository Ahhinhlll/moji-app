import request from "../utils/request";

export const getAllUsers = async () => {
  const response = await request.get("nguoidung/getall");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await request.get(`nguoidung/getbyid/${id}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await request.post("nguoidung/insert", data);
  return response.data;
};

export const getRolegetById = async (maVT) => {
  const response = await request.get(`vaitro/getbyid/${maVT}`);
  return response.data.tenVT;
};

export const updatePassword = async (data) => {
  const response = await request.patch("nguoidung/updatepassword", data);
  return response.data;
};
