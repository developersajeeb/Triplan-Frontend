import { config } from "@/config";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (requestConfig) {
    return requestConfig;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  async function onRejected(error: AxiosError) {
    const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;
    const responseMessage = typeof error.response?.data === "object" && error.response?.data
      ? (error.response.data as { message?: string }).message
      : undefined;
    const errorText = [responseMessage, error.message].filter(Boolean).join(" ");

    const isAuthFailure = /(token|jwt|expired|unauthorized)/i.test(errorText);
    const requestUrl = originalRequest?.url ?? "";
    const isAuthEndpoint = /\/auth\/(login|refresh-token|logout)/.test(requestUrl);

    if (!originalRequest || originalRequest._retry || !isAuthFailure || isAuthEndpoint) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshClient.post("/auth/refresh-token");
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);
