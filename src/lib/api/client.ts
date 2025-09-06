import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../env";

export const serviceInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});


async function request<T>(
    apiInstance: AxiosInstance,
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    options: AxiosRequestConfig = {}
): Promise<T> {

    try {
        const response = await apiInstance.request<T>({
            url,
            method,
            headers: options.headers ?? {},
            signal: options.signal,
            params: options.params,
            data: options.data,
            timeout: options.timeout ?? 10000,
        });
        return response.data;
    } catch (err) {
        console.error(`[API ERROR] ${method.toUpperCase()} ${url}`, err);
        throw err;
    }
}

export const serviceClient = {
    get: <T>(url: string, options?: AxiosRequestConfig) => request<T>(serviceInstance, 'get', url, options),
    post: <T>(url: string, options?: AxiosRequestConfig) => request<T>(serviceInstance, 'post', url, options),
    put: <T>(url: string, options?: AxiosRequestConfig) => request<T>(serviceInstance, 'put', url, options),
    del: <T>(url: string, options?: AxiosRequestConfig) => request<T>(serviceInstance, 'delete', url, options),
    patch: <T>(url: string, options?: AxiosRequestConfig) => request<T>(serviceInstance, 'patch', url, options),
};
