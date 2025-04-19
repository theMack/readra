import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * Base API configuration
 */
const apiConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create Axios instance with default configuration
 */
const axiosInstance: AxiosInstance = axios.create(apiConfig);

/**
 * Request interceptor to add auth token
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('authToken');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle common responses
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
          const response = await axiosInstance.post('/auth/refresh-token', {
            refreshToken,
          });
          
          const { token } = response.data;
          
          if (token) {
            localStorage.setItem('authToken', token);
            
            // Retry the original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          }
        }
        
        // If no refresh token or refresh failed, redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        window.location.href = '/login';
        return Promise.reject(error);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear auth data and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    // Handle other errors
    return Promise.reject(error);
  }
);

/**
 * API client with typed methods
 */
export const apiClient = {
  /**
   * GET request
   * @param url API endpoint
   * @param config Optional axios config
   * @returns Promise with response
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axiosInstance.get<T>(url, config);
  },
  
  /**
   * POST request
   * @param url API endpoint
   * @param data Request data
   * @param config Optional axios config
   * @returns Promise with response
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axiosInstance.post<T>(url, data, config);
  },
  
  /**
   * PUT request
   * @param url API endpoint
   * @param data Request data
   * @param config Optional axios config
   * @returns Promise with response
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axiosInstance.put<T>(url, data, config);
  },
  
  /**
   * PATCH request
   * @param url API endpoint
   * @param data Request data
   * @param config Optional axios config
   * @returns Promise with response
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axiosInstance.patch<T>(url, data, config);
  },
  
  /**
   * DELETE request
   * @param url API endpoint
   * @param config Optional axios config
   * @returns Promise with response
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return axiosInstance.delete<T>(url, config);
  },
};

export default apiClient;