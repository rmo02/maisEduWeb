import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.6.20:3011",
  baseURL: "http://34.151.211.219:3010",
  timeout: 5000,
});

export default api;

// export const createSession = async (mat, password) => {
//   return app.post("/escolas/users/professores/login", { mat, password });
// };
