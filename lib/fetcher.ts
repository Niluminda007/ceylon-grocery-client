// import { AxiosError } from "axios";
// import axiosInstance from "./axiosInstance";
// interface FetcherConfig {
//   url: string;
//   method?: "GET" | "POST" | "PUT" | "DELETE";
//   data?: any;
//   params?: any;
// }

// export const fetcher = async ({
//   url,
//   method = "GET",
//   data,
//   params,
//   ...config
// }: FetcherConfig): Promise<any> => {
//   try {
//     const response = await axiosInstance({
//       url,
//       method,
//       data,
//       params,
//       ...config,
//     });
//     return response.data;
//   } catch (error: any) {
//     if (error instanceof AxiosError) {
//       const errorMessage =
//         error.response?.data?.error || error.message || "Unknown error";
//       throw new Error(errorMessage);
//     } else {
//       throw error;
//     }
//   }
// };

import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

interface FetcherConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: any;
}

// export const fetcher = async <T>({
//   url,
//   method = "GET",
//   data,
//   params,
//   ...config
// }: FetcherConfig): Promise<T> => {
//   try {
//     const response: AxiosResponse<T> = await axiosInstance({
//       url,
//       method,
//       data,
//       params,
//       ...config,
//     });
//     return response.data;
//   } catch (error: any) {
//     if (error instanceof AxiosError) {
//       const errorMessage =
//         error.response?.data?.error || error.message || "Unknown error";
//       throw new Error(errorMessage);
//     } else {
//       throw error;
//     }
//   }
// };

export const fetcher = async <T>({
  url,
  method = "GET",
  data,
  params,
  ...config
}: FetcherConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance({
      url,
      method,
      data,
      params,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw error;
    }
  }
};
