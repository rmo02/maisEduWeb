import axios from "axios";

export const api = axios.create({
  baseURL: "http://34.151.211.219:3010",
  timeout: 5000,
});

// http://34.151.211.219:3010/disciplinasAluno/eab3999e-c865-4d25-b403-affa84d290ac
// id de um aluno: eab3999e-c865-4d25-b403-affa84d290ac

// 201708419
