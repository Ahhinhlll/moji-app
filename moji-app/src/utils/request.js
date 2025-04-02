import axios from "axios";

const API_DOMAIN = "http://localhost:3001/api/";

const instance = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default instance;
