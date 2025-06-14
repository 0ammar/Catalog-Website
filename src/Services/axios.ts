import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: '*/*',
  },
});
if (typeof window !== 'undefined') {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}













// import axios from "axios";
// import { config } from "process";
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000,
//   headers: {
//     Accept: "*/*",
//   },
// });
// if (typeof window !== 'undefined') {
//   api.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token');
//     }
//   )
// }
