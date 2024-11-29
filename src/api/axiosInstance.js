import axios from "axios";

const todoAxiosInstance = axios.create({
  baseURL: "http://localhost:3000/todos",
  timeout: 5000,
});

// 요청 인터셉터
todoAxiosInstance.interceptors.request.use(
  (config) => {
    console.log(`method: ${config.method}\nbaseURL: ${config.baseURL}`);
    return config;
  },
  (error) => {
    console.log(`request error =>`, error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
todoAxiosInstance.interceptors.response.use(
  (response) => {
    console.log("response.data =>", response.data);
    return response;
  },
  (error) => {
    console.log("response error =>", error);
    return Promise.reject(error);
  }
);

export default todoAxiosInstance;
