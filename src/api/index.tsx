import axios from "axios";

const api = axios.create({
  baseURL: "http://34.151.211.219:3010",
  timeout: 5000,
});

export default api;