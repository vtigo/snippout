import { ApiResponse, ApiErrorResponse } from "@/types/api";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: handle anauthorized error (redirect to login?)
    }
    return Promise.reject(error);
  }
);

export async function apiRequest<T = any>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    let response: AxiosResponse;

    switch (method) {
      case 'get':
        response = await api.get(url, config);
        break;
      case 'post':
        response = await api.post(url, config?.data, config);
        break;
      case 'put':
        response = await api.put(url, config?.data, config);
        break;
      case 'patch':
        response = await api.patch(url, config?.data, config);
        break;
      case 'delete':
        response = await api.delete(url, config);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    // Server responded with an error
    if (axiosError.response) {
      const errorData = axiosError.response.data || {};
      return {
        success: false,
        error: errorData.message || errorData.error || 'Server error',
        status: axiosError.response.status
      };
    }

    // Request was made but no response received
    if (axiosError.request) {
      return {
        success: false,
        error: 'No response from server'
      };
    }

    // Error setting up the request
    return {
      success: false,
      error: axiosError.message || 'Network error'
    };
  }
}