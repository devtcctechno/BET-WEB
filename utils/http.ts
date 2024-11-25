import axios from "axios";


const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": '*',
  },
});

http.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
    };
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    // Do something with response error
    if (error?.response?.status === 401 || error?.response?.status === "401") {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default http;
